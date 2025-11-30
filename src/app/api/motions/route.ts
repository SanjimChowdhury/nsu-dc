import type { NextRequest } from 'next/server'

type Language = 'english' | 'bangla'
type Format = 'BP' | 'AP' | 'WSDC' | 'Any'
type Tone = 'general' | 'novice-friendly' | 'spicy'

const DEFAULT_FALLBACK = {
  motions: [
    'This House Would prioritize climate adaptation funding for coastal cities.',
    'এই সভা বিশ্বাস করে যে বিশ্ববিদ্যালয়গুলোকে সকল শিক্ষার্থীর জন্য বাধ্যতামূলক যুক্তিবিদ্যা কোর্স চালু করা উচিত।',
    'This House Supports using AI assistants to translate parliamentary proceedings into regional languages in real time.',
  ],
  language: 'english' as Language,
  format: 'Any' as Format,
  notes:
    'Fallback sample because OPENAI_API_KEY is missing. Add one to get live AI-generated motions.',
}

export async function POST(req: NextRequest) {
  try {
    const { topic = '', language = 'english', format = 'Any', tone = 'general' } =
      await req.json()

    const lng = (language as Language) || 'english'
    const fmt = (format as Format) || 'Any'
    const aiTone = (tone as Tone) || 'general'
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return Response.json(DEFAULT_FALLBACK, { status: 200 })
    }

    const systemPrompt = [
      'You are an expert debate motion writer for university circuits.',
      'Return 3 concise motions only, keep them realistic and clashable.',
      'Respect the requested language and format.',
      'Tone:',
      '- general: balanced, broadly applicable.',
      '- novice-friendly: clear wording, accessible topics.',
      '- spicy: sharper stance and controversy.',
      'If language is Bangla, write the motions fully in Bangla script.',
    ].join(' ')

    const userPrompt = [
      `Language: ${lng}`,
      `Format: ${fmt}`,
      `Tone: ${aiTone}`,
      `Context: ${topic || 'No specific context; make it varied.'}`,
      'Return JSON with keys: motions (string array), notes (string).',
    ].join('\n')

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: aiTone === 'spicy' ? 1 : aiTone === 'novice-friendly' ? 0.7 : 0.85,
        max_tokens: 500,
      }),
    })

    if (!openaiRes.ok) {
      const text = await openaiRes.text()
      return new Response(text || 'Upstream AI error', { status: 502 })
    }

    const json = await openaiRes.json()
    const content = json?.choices?.[0]?.message?.content

    if (!content) {
      return Response.json(DEFAULT_FALLBACK, { status: 200 })
    }

    // Try to parse JSON payload from the model; fall back to lines.
    let parsed
    try {
      parsed = JSON.parse(content)
    } catch {
      const motions = String(content)
        .split('\n')
        .map((line: string) => line.replace(/^\d+[\).\s-]+/, '').trim())
        .filter(Boolean)
        .slice(0, 3)

      parsed = { motions, notes: 'Generated from AI response' }
    }

    return Response.json(
      {
        motions: parsed.motions || DEFAULT_FALLBACK.motions,
        notes: parsed.notes,
        language: lng,
        format: fmt,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Motion generator error', error)
    return new Response('Failed to generate motions', { status: 500 })
  }
}
