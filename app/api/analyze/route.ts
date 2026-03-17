import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json()

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llava',
        prompt: `Analyze this clothing item and reply ONLY with a JSON object like this, no extra text:
{
  "category": "shirt or pants or shoes or tshirt or jacket or dress or accessory or socks",
  "primary_color": "the main color",
  "style_tags": ["casual", "formal", "sporty"],
  "occasion": ["everyday", "office", "party", "gym"],
  "description": "one short sentence describing the item"
}`,
        images: [imageBase64],
        stream: false
      })
    })

    const data = await response.json()
    const text = data.response

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ error: 'Could not parse AI response' }, { status: 500 })
    }

    const parsed = JSON.parse(jsonMatch[0])
    return NextResponse.json(parsed)

  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}