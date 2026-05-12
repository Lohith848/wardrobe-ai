# Supabase Row-Level Security (RLS) Fix

## Problem
**Error**: "new row violates row-level security policy for table 'wardrobe_items'"

This error occurs because the INSERT statement is missing the `user_id` field, which is required by the RLS policy to ensure users can only insert their own items.

## Root Cause Analysis

### Issue 1: Missing `user_id` in INSERT (Frontend)
**Location**: `app/upload/page.tsx`, line 66

The current code:
```typescript
const { error } = await supabase.from('wardrobe_items').insert({
  image_base64: compressed,
  category: analysis.category,
  primary_color: analysis.primary_color,
  style_tags: analysis.style_tags,
  occasion: analysis.occasion,
  description: analysis.description
  // ❌ MISSING: user_id
})
```

### Issue 2: Missing RLS Policies (Database)
The `wardrobe_items` table needs proper RLS policies to:
1. Allow authenticated users to INSERT only their own records
2. Allow authenticated users to SELECT only their own records
3. Allow authenticated users to UPDATE only their own records
4. Allow authenticated users to DELETE only their own records

### Issue 3: Storage Bucket Permissions
If storing images in Supabase Storage, bucket policies need to restrict access to authenticated users.

---

## Solution

### Step 1: Enable RLS on wardrobe_items Table

Run this SQL in Supabase SQL Editor:

```sql
-- Enable RLS on wardrobe_items table
ALTER TABLE wardrobe_items ENABLE ROW LEVEL SECURITY;
```

### Step 2: Create RLS Policies

Run each policy in Supabase SQL Editor:

#### Policy 1: Allow users to INSERT their own items
```sql
CREATE POLICY "Users can insert their own wardrobe items"
ON public.wardrobe_items
FOR INSERT
WITH CHECK (auth.uid() = user_id);
```

#### Policy 2: Allow users to SELECT their own items
```sql
CREATE POLICY "Users can view their own wardrobe items"
ON public.wardrobe_items
FOR SELECT
USING (auth.uid() = user_id);
```

#### Policy 3: Allow users to UPDATE their own items
```sql
CREATE POLICY "Users can update their own wardrobe items"
ON public.wardrobe_items
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
```

#### Policy 4: Allow users to DELETE their own items
```sql
CREATE POLICY "Users can delete their own wardrobe items"
ON public.wardrobe_items
FOR DELETE
USING (auth.uid() = user_id);
```

### Step 3: Ensure wardrobe_items Table Schema

Your table must have a `user_id` column. Create or verify with:

```sql
-- If table doesn't exist, create it
CREATE TABLE IF NOT EXISTS public.wardrobe_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_base64 TEXT NOT NULL,
  category TEXT,
  primary_color TEXT,
  style_tags TEXT[],
  occasion TEXT[],
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create index on user_id for faster queries
CREATE INDEX idx_wardrobe_items_user_id ON public.wardrobe_items(user_id);

-- Enable RLS
ALTER TABLE public.wardrobe_items ENABLE ROW LEVEL SECURITY;
```

### Step 4: Fix Frontend Code

Update `app/upload/page.tsx` to include `user_id` in the INSERT:

```typescript
'use client'
import { useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'

function compressImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const img = new Image()
    img.onload = () => {
      const MAX = 300
      let w = img.width, h = img.height
      if (w > h && w > MAX) { h = (h * MAX) / w; w = MAX }
      else if (h > MAX) { w = (w * MAX) / h; h = MAX }
      canvas.width = w; canvas.height = h
      ctx.drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/jpeg', 0.7))
    }
    img.src = URL.createObjectURL(file)
  })
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFile(selected: File) {
    setFile(selected); setPreview(URL.createObjectURL(selected))
    setResult(null); setStatus(''); setProgress(0)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (f) handleFile(f)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f && f.type.startsWith('image/')) handleFile(f)
  }

  async function handleUpload() {
    if (!file) return
    setLoading(true)
    try {
      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      if (userError || !user) throw new Error('User not authenticated')

      setStatus('Preparing image...'); setProgress(20)
      const compressed = await compressImage(file)
      const base64Only = compressed.split(',')[1]

      setStatus('AI is analyzing your item...'); setProgress(50)
      const res = await fetch('/api/analyze', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Only })
      })
      const analysis = await res.json()
      if (analysis.error) throw new Error(analysis.error)

      setStatus('Saving to wardrobe...'); setProgress(85)
      const { error } = await supabase.from('wardrobe_items').insert({
        user_id: user.id,  // ✅ ADD THIS: Include user_id
        image_base64: compressed,
        category: analysis.category,
        primary_color: analysis.primary_color,
        style_tags: analysis.style_tags,
        occasion: analysis.occasion,
        description: analysis.description
      })
      if (error) throw error

      setProgress(100); setResult(analysis); setStatus('Done!')
    } catch (err: any) {
      setStatus('Error: ' + err.message); setProgress(0)
    }
    setLoading(false)
  }

  // ... rest of JSX remains the same
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f3f4f6',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <Navbar />
      <div style={{ maxWidth: 520, margin: '32px auto 40px', padding: '0 16px' }}>
        {/* ... existing JSX ... */}
      </div>
    </div>
  )
}
```

### Step 5: Storage Bucket Policy (If Using Image Storage)

If storing images in Supabase Storage instead of base64:

```sql
-- Create storage bucket policy for authenticated users
INSERT INTO storage.buckets (id, name, public)
VALUES ('wardrobe-images', 'wardrobe-images', false);

-- Allow users to upload to their own folder
CREATE POLICY "Users can upload to their folder"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'wardrobe-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to read their own images
CREATE POLICY "Users can view their images"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'wardrobe-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

---

## Verification Checklist

- [ ] RLS is enabled on `wardrobe_items` table
- [ ] All 4 RLS policies are created (INSERT, SELECT, UPDATE, DELETE)
- [ ] `user_id` column exists in `wardrobe_items` table
- [ ] Frontend code includes `user_id` in INSERT statement
- [ ] User is authenticated before uploading (verified with `supabase.auth.getUser()`)
- [ ] Test upload with authenticated user account
- [ ] Verify items appear in user's wardrobe only

---

## Testing

1. Sign in to your wardrobe app
2. Go to `/upload` page
3. Upload a clothing item
4. Verify no RLS error appears
5. Check that item is saved to your wardrobe
6. Try accessing the item as a different user (should not be visible)

---

## Common Issues & Troubleshooting

### Still Getting RLS Error?
- ✅ Verify `user_id` is included in INSERT
- ✅ Verify user is authenticated (`supabase.auth.getUser()` returns a user)
- ✅ Verify `user_id` column exists in table
- ✅ Verify RLS is enabled on table
- ✅ Verify policies are created correctly

### Getting "User not authenticated"?
- ✅ Sign in to the app first
- ✅ Check Supabase auth configuration
- ✅ Verify authentication provider is set up

### Items not showing up?
- ✅ Run SELECT query with RLS disabled to verify data exists
- ✅ Check that SELECT policy is correctly created
- ✅ Verify `user_id` matches authenticated user ID
