'use client'

import React, { useState } from 'react'
import CountdownTimer from '@/components/CountdownTimer'

/**
 * Coming Soon Page
 * 
 * Placeholder page for features/content under development
 * Includes countdown timer and email notification form (UI only for now)
 */
export default function ComingSoonPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  // Set target date for launch (example: 10 days from now)
  const launchDate = new Date()
  launchDate.setDate(launchDate.getDate() + 10)
  const targetDate = launchDate.toISOString()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Future implementation - send email to backend
    if (email) {
      setMessage('Thank you! We\'ll notify you when this page is ready.')
      setEmail('')
      setTimeout(() => setMessage(''), 5000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <main className="min-h-[80vh] flex items-center">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 w-full">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Text Content */}
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
                Something great is on the way.
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                We're putting the final touches on this page. Check back soon—or drop your email
                and we'll ping you.
              </p>

              {/* Countdown Timer */}
              <div className="mb-8">
                <CountdownTimer targetDate={targetDate} />
              </div>

              {/* Email Notification Form (UI Only) */}
              <form onSubmit={handleSubmit} className="flex max-w-md gap-3" noValidate>
                <input
                  id="notify-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Notify me
                </button>
              </form>
              {message && (
                <p className="mt-3 text-sm text-green-600 font-medium">{message}</p>
              )}
            </div>

            {/* Visual Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="w-full h-72 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-gray-600 font-semibold">Exciting content coming soon!</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
