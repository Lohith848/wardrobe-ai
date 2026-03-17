'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [base64, setBase64] = useState<string | null>(null)
  const [status, setStatus] = useState('')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0]
    if (!selected) return
    setFile(selected)
    setResult(null)
    setStatus('')

    const reader = new FileReader()
    reader.onload = () => {
      const full = reader.result as string
      setPreview(full)
      setBase64(full.split(',')[1])
    }
    reader.readAsDataURL(selected)
  }

  async function handleUpload() {
    if (!file || !base64) return
    setLoading(true)

    try {
      // Step 1 — Analyze with Ollama
      setStatus('AI is analyzing your item...')
      const analyzeRes = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64 })
      })

      const analysis = await analyzeRes.json()
      if (analysis.error) throw new Error(analysis.error)

      // Step 2 — Save to Supabase (no storage, just base64)
      setStatus('Saving to wardrobe...')
      const { error: dbError } = await supabase
        .from('wardrobe_items')
        .insert({
          image_base64: preview,
          category: analysis.category,
          primary_color: analysis.primary_color,
          style_tags: analysis.style_tags,
          occasion: analysis.occasion,
          description: analysis.description
        })

      if (dbError) throw dbError

      setResult(analysis)
      setStatus('Done!')

    } catch (err: any) {
      setStatus('❌ Error: ' + err.message)
    }

    setLoading(false)
  }

  return (
    <div style={{
      maxWidth: 500,
      margin: '40px auto',
      padding: '0 20px',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 8 }}>
        Add to Wardrobe
      </h1>
      <p style={{ color: '#888', marginBottom: 24 }}>
        Upload a clothing item and AI will analyze it
      </p>

      {/* Upload box */}
      <label style={{
        display: 'block',
        border: '2px dashed #444',
        borderRadius: 12,
        padding: 32,
        textAlign: 'center',
        cursor: 'pointer',
        marginBottom: 16,
        background: '#111'
      }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {preview
          ? <img
              src={preview}
              alt="preview"
              style={{
                maxHeight: 240,
                borderRadius: 8,
                objectFit: 'contain',
                maxWidth: '100%'
              }}
            />
          : <p style={{ color: '#666' }}>Click to choose a photo</p>
        }
      </label>

      {/* Analyze button */}
      {file && !loading && !result && (
        <button
          onClick={handleUpload}
          style={{
            width: '100%',
            padding: 14,
            background: '#fff',
            color: '#000',
            border: 'none',
            borderRadius: 10,
            fontSize: 16,
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Analyze with AI
        </button>
      )}

      {/* Status */}
      {loading && (
        <p style={{
          textAlign: 'center',
          color: '#aaa',
          padding: 16
        }}>
          ⏳ {status}
        </p>
      )}

      {/* Error */}
      {!loading && status.startsWith('❌') && (
        <p style={{ color: 'red', textAlign: 'center' }}>{status}</p>
      )}

      {/* Result */}
      {result && (
        <div style={{
          marginTop: 24,
          background: '#1a1a1a',
          borderRadius: 12,
          padding: 20,
          border: '1px solid #333'
        }}>
          <h2 style={{ fontSize: 18, marginBottom: 16, color: '#fff' }}>
            ✅ Item Added to Wardrobe!
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <p style={{ color: '#ccc' }}>
              <b style={{ color: '#fff' }}>Category:</b> {result.category}
            </p>
            <p style={{ color: '#ccc' }}>
              <b style={{ color: '#fff' }}>Color:</b> {result.primary_color}
            </p>
            <p style={{ color: '#ccc' }}>
              <b style={{ color: '#fff' }}>Style:</b> {result.style_tags?.join(', ')}
            </p>
            <p style={{ color: '#ccc' }}>
              <b style={{ color: '#fff' }}>Occasion:</b> {result.occasion?.join(', ')}
            </p>
            <p style={{ color: '#ccc' }}>
              <b style={{ color: '#fff' }}>Description:</b> {result.description}
            </p>
          </div>
          <button
            onClick={() => {
              setFile(null)
              setPreview(null)
              setBase64(null)
              setResult(null)
              setStatus('')
            }}
            style={{
              marginTop: 16,
              width: '100%',
              padding: 12,
              background: '#fff',
              color: '#000',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Add Another Item
          </button>
        </div>
      )}
    </div>
  )
}