import type { NextRequest } from 'next/server'

type Language = 'english' | 'bangla'
type Format = 'BP' | 'AP' | 'WSDC' | 'Any'
type Tone = 'general' | 'novice-friendly' | 'spicy'

const DEFAULT_FALLBACK = {
  motions: [
    'This House Would prioritize climate adaptation funding for coastal cities.',
    'এই সভা বিশ্বাস করে বিশ্ববিদ্যালয়গুলোকে সব শিক্ষার্থীর জন্য বাধ্যতামূলক যুক্তিবিদ্যা কোর্স চালু করা উচিত।',
    'This House Supports using AI assistants to translate parliamentary proceedings into regional languages in real time.',
  ],
  language: 'english' as Language,
  format: 'Any' as Format,
  notes: 'Fallback sample because GEMINI_API_KEY is missing. Add one to get live AI-generated motions.',
}

export async function POST(req: NextRequest) {
  try {
    const { topic = '', language = 'english', format = 'Any', tone = 'general' } =
      await req.json()

    const lng = (language as Language) || 'english'
    const fmt = (format as Format) || 'Any'
    const aiTone = (tone as Tone) || 'general'
    
    const apiKey = process.env.GEMINI_API_KEY
    
    if (!apiKey) {
      return Response.json(DEFAULT_FALLBACK, { status: 200 })
    }

    const prompt = [
      'You are an expert debate motion writer for university circuits.',
      'Return 3 concise motions only, keep them realistic and clashable.',
      'Respect the requested language and format.',
      'Tone:',
      '- general: balanced, broadly applicable.',
      '- novice-friendly: clear wording, accessible topics.',
      '- spicy: sharper stance and controversy.',
      'If language is Bangla, write the motions fully in Bangla script.',
      '',
      `Language: ${lng}`,
      `Format: ${fmt}`,
      `Tone: ${aiTone}`,
      `Context: ${topic || 'No specific context; make it varied.'}`,
      '',
      'Return ONLY valid JSON with keys: motions (string array of 3 motions), notes (string with brief explanation).',
      'Do not include markdown code blocks or any other text outside the JSON.',
    ].join('\n')

    // Gemini API configuration
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`

    const geminiRes = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
        generationConfig: {
          temperature: aiTone === 'spicy' ? 1 : aiTone === 'novice-friendly' ? 0.7 : 0.85,
          maxOutputTokens: 500,
        },
      }),
    })

    if (!geminiRes.ok) {
      const text = await geminiRes.text()
      console.error('Gemini API error:', text)
      return new Response(text || 'Upstream AI error', { status: 502 })
    }

    const json = await geminiRes.json()
    const content = json?.candidates?.[0]?.content?.parts?.[0]?.text

    if (!content) {
      return Response.json(DEFAULT_FALLBACK, { status: 200 })
    }

    // Try to parse JSON payload from the model; fall back to lines.
    let parsed
    try {
      // Handle potential markdown code blocks in response
      const cleanContent = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim()
      parsed = JSON.parse(cleanContent)
    } catch {
      const motions = String(content)
        .split('\n')
        .map((line: string) => line.replace(/^\d+[\).\s-]+/, '').trim())
        .filter(Boolean)
        .slice(0, 3)

      parsed = { motions, notes: 'Generated from Gemini response' }
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
