import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { items, occasion, weather, style } = await req.json()

    const wardrobeText = items.map((item: any, i: number) =>
      `${i + 1}. ${item.category} - ${item.primary_color}, ${item.style_tags?.join(', ')}, ${item.description}`
    ).join('\n')

    const prompt = `You are a personal fashion stylist. Here is the user's wardrobe:

${wardrobeText}

Occasion: ${occasion}
Weather: ${weather}
Fashion style: ${style}

Pick the BEST outfit matching the fashion style and occasion. Reply ONLY with this JSON, no extra text:
{
  "outfit": [1, 3, 4],
  "title": "short outfit name",
  "reason": "one sentence why this combination works for this style and occasion",
  "tip": "one specific styling tip for this fashion style"
}`

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2',
        prompt: prompt,
        stream: false
      })
    })

    const data = await response.json()
    const text = data.response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Could not parse AI response')

    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json(parsed)

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}