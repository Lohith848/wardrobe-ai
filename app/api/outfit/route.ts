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

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500
      })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error?.message || 'Groq API error')
    }

    const text = data.choices[0].message.content
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Could not parse AI response')

    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json(parsed)

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}