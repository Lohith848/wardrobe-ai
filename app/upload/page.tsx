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
    <div style={{ minHeight: '100vh', background: '#050505', fontFamily: 'system-ui, sans-serif' }}>
      <Navbar />
      <div style={{ maxWidth: 520, margin: '48px auto', padding: '0 24px' }}>

        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontSize: 28, fontWeight: 900, color: '#ffffff',
            margin: '0 0 6px', letterSpacing: '-1px'
          }}>Add to wardrobe</h1>
          <p style={{ color: '#71717a', margin: 0, fontSize: 15 }}>
            Drop a photo — AI tags it automatically
          </p>
        </div>

        {/* Drop zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragging ? '#a78bfa' : '#e8e8e8'}`,
            borderRadius: 16, overflow: 'hidden',
            background: dragging ? 'rgba(139, 92, 246, 0.1)' : preview ? '#ffffff' : '#111111',
            cursor: 'pointer', transition: 'all 0.2s', marginBottom: 16,
            padding: preview ? 0 : 52, textAlign: 'center'
          }}
        >
          <input ref={inputRef} type="file" accept="image/*"
            onChange={handleFileChange} style={{ display: 'none' }} />
          {preview ? (
            <img src={preview} alt="preview" style={{
              width: '100%', maxHeight: 300, objectFit: 'cover', display: 'block'
            }} />
          ) : (
            <>
              <div style={{ fontSize: 36, marginBottom: 10 }}>🧩</div>
              <p style={{ color: '#e5e7eb', fontWeight: 700, margin: '0 0 4px', fontSize: 15 }}>
                Drop your clothing photo here
              </p>
              <p style={{ color: '#52525b', fontSize: 13, margin: 0 }}>
                Click to browse · JPG or PNG
              </p>
            </>
          )}
        </div>

        {/* Progress */}
        {loading && (
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: '#a1a1aa' }}>{status}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>{progress}%</span>
            </div>
            <div style={{ height: 5, background: '#27272a', borderRadius: 5, overflow: 'hidden' }}>
              <div style={{
                width: `${progress}%`, height: '100%',
                background: 'linear-gradient(90deg, #6c63ff, #00b894)',
                borderRadius: 5, transition: 'width 0.4s ease'
              }} />
            </div>
          </div>
        )}

        {/* Button */}
        {file && !loading && !result && (
          <button onClick={handleUpload} style={{
            width: '100%', padding: 15, background: '#ffffff', color: '#050505',
            border: 'none', borderRadius: 12, fontSize: 16,
            cursor: 'pointer', fontWeight: 800, letterSpacing: '-0.3px'
          }}>
            Analyze with AI →
          </button>
        )}

        {!loading && status.startsWith('Error') && (
          <p style={{ color: '#e53e3e', fontSize: 14, textAlign: 'center' }}>{status}</p>
        )}

        {/* Result */}
        {result && (
          <div style={{ marginTop: 20, border: '1px solid #f0f0f0', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '20px 20px 0', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, background: 'rgba(16, 185, 129, 0.1)', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>✅</div>
              <p style={{ fontWeight: 800, color: '#ffffff', margin: 0, fontSize: 16 }}>Added to wardrobe!</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '0 20px', marginBottom: 12 }}>
              {[
                { l: 'Category', v: result.category },
                { l: 'Color', v: result.primary_color },
                { l: 'Style', v: result.style_tags?.join(', ') },
                { l: 'Occasion', v: result.occasion?.join(', ') },
              ].map(i => (
                <div key={i.l} style={{ background: '#111111', borderRadius: 10, padding: '10px 12px' }}>
                  <p style={{
                    color: '#52525b', fontSize: 10, fontWeight: 700,
                    letterSpacing: 1.2, textTransform: 'uppercase', margin: '0 0 2px'
                  }}>{i.l}</p>
                  <p style={{
                    color: '#ffffff', fontSize: 13, fontWeight: 700,
                    margin: 0, textTransform: 'capitalize'
                  }}>{i.v}</p>
                </div>
              ))}
            </div>

            <p style={{
              color: '#a1a1aa', fontSize: 13, margin: '0 20px 20px',
              background: '#111111', padding: '10px 12px', borderRadius: 10
            }}>
              {result.description}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, padding: '0 20px 20px' }}>
              <button
                onClick={() => { setFile(null); setPreview(null); setResult(null); setStatus(''); setProgress(0) }}
                style={{
                  padding: 12, background: '#ffffff', color: '#050505', border: 'none',
                  borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 14
                }}>
                Add another
              </button>
              <a href="/wardrobe" style={{
                padding: 12, background: 'rgba(139, 92, 246, 0.1)', color: '#a78bfa',
                border: '1px solid #e0d9ff', borderRadius: 10, cursor: 'pointer',
                fontWeight: 700, fontSize: 14, textDecoration: 'none', textAlign: 'center'
              }}>
                View wardrobe →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}