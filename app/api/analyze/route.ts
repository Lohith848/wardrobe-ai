import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json()

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageBase64}`
                }
              },
              {
                type: 'text',
                text: `Analyze this clothing item and reply ONLY with a JSON object like this, no extra text:
{
  "category": "shirt or pants or shoes or tshirt or jacket or dress or accessory or socks",
  "primary_color": "the main color",
  "style_tags": ["casual", "formal", "sporty"],
  "occasion": ["everyday", "office", "party", "gym"],
  "description": "one short sentence describing the item"
}`
              }
            ]
          }
        ],
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