'use client'

import { useState } from 'react'

type Language = 'english' | 'bangla'
type Format = 'BP' | 'AP' | 'WSDC' | 'Any'
type Tone = 'general' | 'novice-friendly' | 'spicy'

type MotionResponse = {
  motions: string[]
  notes?: string
  language: Language
  format: Format
}

export default function MotionGenerator() {
  const [topic, setTopic] = useState('')
  const [language, setLanguage] = useState<Language>('english')
  const [format, setFormat] = useState<Format>('BP')
  const [tone, setTone] = useState<Tone>('general')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<MotionResponse | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/motions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          language,
          format,
          tone,
        }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Failed to generate motions')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-gradient-to-br from-white to-gray-50 border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 space-y-10">
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-blue-600 uppercase tracking-[0.2em]">
            Motion Lab
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            AI-powered Motion Generator
          </h2>
          <p className="text-gray-600">
            Get fresh motions in Bangla or English tailored to your format and tone. Perfect for
            practice rounds, drills, or tournament prep.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="language" className="text-sm font-semibold text-gray-700">
                Language
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(['english', 'bangla'] as Language[]).map((lng) => (
                  <button
                    key={lng}
                    type="button"
                    onClick={() => setLanguage(lng)}
                    className={`rounded-lg border px-3 py-3 text-sm font-semibold transition-all ${
                      language === lng
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {lng === 'english' ? 'English' : 'বাংলা'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="format" className="text-sm font-semibold text-gray-700">
                Format
              </label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value as Format)}
                className="w-full rounded-lg border border-gray-200 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="BP">British Parliamentary (BP)</option>
                <option value="AP">Asian Parliamentary (AP)</option>
                <option value="WSDC">WSDC</option>
                <option value="Any">Any / Mixed</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Tone</label>
              <div className="grid grid-cols-3 gap-2">
                {(['general', 'novice-friendly', 'spicy'] as Tone[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`rounded-lg border px-3 py-3 text-xs font-semibold transition-all ${
                      tone === t
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    {t === 'general'
                      ? 'Balanced'
                      : t === 'novice-friendly'
                        ? 'Novice-friendly'
                        : 'Spicy'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-semibold text-gray-700">
              Topic or context (optional)
            </label>
            <textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              placeholder="e.g., education reforms in Bangladesh, AI ethics, climate adaptation in coastal cities"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500">
              Leave blank for fully random motions. Add hints (region, theme, difficulty) to steer
              the generator.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-gray-600">
              Powered by your OPENAI_API_KEY. Nothing is stored on the server.
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-60"
            >
              {loading ? 'Generating…' : 'Generate motions'}
            </button>
          </div>
        </form>

        <div className="grid gap-4">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {result && (
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 font-semibold">
                  {result.language === 'bangla' ? 'বাংলা' : 'English'}
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700">
                  Format: {result.format}
                </span>
                <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700">
                  Tone: {tone}
                </span>
              </div>
              <ol className="space-y-3 list-decimal list-inside text-gray-900">
                {result.motions.map((motion, idx) => (
                  <li key={idx} className="text-base leading-relaxed">
                    {motion}
                  </li>
                ))}
              </ol>
              {result.notes && <p className="text-sm text-gray-600">{result.notes}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
