import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { items, occasion, weather, style } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in wardrobe' }, { status: 400 })
    }

    const wardrobeText = items.map((item: any, i: number) =>
      `Item ${i + 1}: ${item.category.toUpperCase()}
   - Color: ${item.primary_color}
   - Style: ${item.style_tags?.join(', ')}
   - Occasion: ${item.occasion?.join(', ')}
   - Description: ${item.description}`
    ).join('\n\n')

    const itemCount = items.length

    const prompt = `You are an expert personal fashion stylist AI with deep knowledge of color theory, fashion trends, and outfit coordination.

THE USER'S WARDROBE (${itemCount} items):
${wardrobeText}

USER PREFERENCES:
- Occasion: ${occasion}
- Weather: ${weather}
- Fashion Style: ${style}

YOUR TASK:
Analyze every item in the wardrobe carefully and create the BEST complete outfit that matches the user's occasion, weather and fashion style preferences.

STRICT RULES YOU MUST FOLLOW:
1. You MUST select a MINIMUM of 3 items
2. A complete outfit MUST have: top (shirt/tshirt/jacket) + bottom (pants/shorts) + footwear (shoes)
3. If a jacket is available and weather is cold/rainy/winter, ALWAYS include it
4. Colors MUST complement or match each other (no clashing colors)
5. All selected items MUST fit the requested occasion and fashion style
6. NEVER pick just 1 or 2 items — always build a COMPLETE look
7. Consider the weather — hot weather = lighter items, cold = layers

COLOR COORDINATION RULES:
- Neutral colors (black, white, grey, navy) go with everything
- Earth tones (brown, beige, tan) pair well together
- Avoid combining more than 2 bold colors
- Dark bottoms with light tops always work

Reply ONLY with this exact JSON format, absolutely no extra text before or after:
{
  "outfit": [1, 2, 3],
  "title": "catchy outfit name max 4 words",
  "reason": "explain why these specific items work together for this occasion and style in 2 sentences",
  "tip": "one very specific actionable styling tip for this exact outfit"
}`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an expert fashion stylist. You always return valid JSON only. You always pick at least 3 items for a complete outfit. Never return incomplete outfits.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 600,
        temperature: 0.7
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

    // Safety check — if AI still picked less than 2 items, force add more
    if (!parsed.outfit || parsed.outfit.length < 2) {
      const allIndexes = items.map((_: any, i: number) => i + 1)
      parsed.outfit = allIndexes.slice(0, Math.min(4, allIndexes.length))
      parsed.title = parsed.title || 'Complete Look'
      parsed.reason = parsed.reason || 'Best combination from your wardrobe for this occasion.'
      parsed.tip = parsed.tip || 'Make sure all items are clean and well-fitted for the best look.'
    }

    return NextResponse.json(parsed)

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}