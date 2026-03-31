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
        image_base64: compressed, category: analysis.category,
        primary_color: analysis.primary_color, style_tags: analysis.style_tags,
        occasion: analysis.occasion, description: analysis.description
      })
      if (error) throw error

      setProgress(100); setResult(analysis); setStatus('Done!')
    } catch (err: any) {
      setStatus('Error: ' + err.message); setProgress(0)
    }
    setLoading(false)
  }

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
        <div style={{ marginBottom: 20 }}>
          <h1
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: '#111827',
              margin: '0 0 4px',
            }}
          >
            Add an item to your wardrobe
          </h1>
          <p style={{ color: '#6b7280', margin: 0, fontSize: 13 }}>
            Choose a clear photo of a single clothing item. AI will tag it for you.
          </p>
        </div>

        {/* Drop zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => {
            e.preventDefault()
            setDragging(true)
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            border: `1px dashed ${dragging ? '#4b5563' : '#d1d5db'}`,
            borderRadius: 12,
            background: '#ffffff',
            cursor: 'pointer',
            transition: 'border-color 0.15s ease, background-color 0.15s ease',
            marginBottom: 12,
            padding: 12,
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          <div
            style={{
              borderRadius: 10,
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              height: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <p
                  style={{
                    margin: '0 0 4px',
                    fontSize: 14,
                    fontWeight: 500,
                    color: '#111827',
                  }}
                >
                  Drop a clothing photo here
                </p>
                <p style={{ color: '#6b7280', fontSize: 12, margin: 0 }}>
                  Or tap to browse · JPG or PNG
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        {loading && (
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 4,
              }}
            >
              <span style={{ fontSize: 12, color: '#6b7280' }}>{status}</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#111827',
                }}
              >
                {progress}%
              </span>
            </div>
            <div
              style={{
                height: 4,
                background: '#e5e7eb',
                borderRadius: 999,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: '#111827',
                  borderRadius: 999,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        )}

        {/* Button */}
        {file && !loading && !result && (
          <button
            onClick={handleUpload}
            style={{
              width: '100%',
              padding: 12,
              background: '#111827',
              color: '#ffffff',
              border: 'none',
              borderRadius: 999,
              fontSize: 14,
              cursor: 'pointer',
              fontWeight: 500,
              marginTop: 4,
            }}
          >
            Analyze and save item
          </button>
        )}

        {!loading && status.startsWith('Error') && (
          <p
            style={{
              color: '#b91c1c',
              fontSize: 12,
              textAlign: 'left',
              marginTop: 8,
            }}
          >
            {status}
          </p>
        )}

        {/* Result */}
        {result && (
          <div
            style={{
              marginTop: 16,
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              background: '#ffffff',
              padding: 12,
            }}
          >
            <p
              style={{
                fontSize: 14,
                fontWeight: 500,
                margin: '0 0 8px',
                color: '#111827',
              }}
            >
              Item saved to your wardrobe.
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: 8,
                marginBottom: 8,
              }}
            >
              {[
                { l: 'Category', v: result.category },
                { l: 'Color', v: result.primary_color },
                { l: 'Style', v: result.style_tags?.join(', ') },
                { l: 'Occasion', v: result.occasion?.join(', ') },
              ].map(i => (
                <div
                  key={i.l}
                  style={{
                    borderRadius: 8,
                    border: '1px solid #e5e7eb',
                    padding: '8px 10px',
                  }}
                >
                  <p
                    style={{
                      color: '#9ca3af',
                      fontSize: 10,
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      margin: '0 0 2px',
                    }}
                  >
                    {i.l}
                  </p>
                  <p
                    style={{
                      color: '#111827',
                      fontSize: 12,
                      margin: 0,
                      textTransform: 'capitalize',
                    }}
                  >
                    {i.v}
                  </p>
                </div>
              ))}
            </div>

            <p
              style={{
                color: '#4b5563',
                fontSize: 12,
                margin: '0 0 10px',
                lineHeight: 1.5,
              }}
            >
              {result.description}
            </p>

            <div
              style={{
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => {
                  setFile(null)
                  setPreview(null)
                  setResult(null)
                  setStatus('')
                  setProgress(0)
                }}
                style={{
                  padding: '8px 14px',
                  background: '#111827',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 999,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                Add another item
              </button>
              <a
                href="/wardrobe"
                style={{
                  padding: '8px 14px',
                  background: '#ffffff',
                  color: '#111827',
                  borderRadius: 999,
                  border: '1px solid #e5e7eb',
                  textDecoration: 'none',
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                View wardrobe
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}