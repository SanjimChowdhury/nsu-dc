'use client'

import React, { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import StatsCard from '@/components/StatsCard'

/**
 * About Page
 * 
 * Displays information about NSU Debate Club including history, achievements, and FAQ
 */
export default function AboutPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: 'Who can join NSUDC?',
      answer: 'Any current NSU student—no prior debating experience required.',
    },
    {
      question: 'Do you train beginners?',
      answer: 'Yes. We run novice bootcamps, practice rounds, and feedback clinics.',
    },
    {
      question: 'How do I register?',
      answer: 'Head to the Register page and fill in the form.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="About North South University Debate Club"
        subtitle="The voice of NSU at home and abroad"
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-12">
        {/* Statistics Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatsCard value={32} suffix="+" label="Years of Excellence" delay={0} />
          <StatsCard value={500} suffix="+" label="Alumni Network" delay={100} />
          <StatsCard value={150} suffix="+" label="Tournaments Won" delay={200} />
          <StatsCard value={25} suffix="+" label="International Awards" delay={300} />
        </section>

        {/* History and At a Glance Section */}
        <section className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Our History
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Established in 1993, the North South University Debate Club (NSUDC) is one of the
                oldest and most successful clubs at North South University. It was the first club
                founded at NSU and has since become a cornerstone of intellectual discourse, public
                speaking, and critical thinking on campus.
              </p>
              <p className="text-gray-600">
                Over the years, NSUDC has grown to represent NSU in numerous national and
                international debate tournaments, consistently bringing home accolades and
                establishing itself as a leader in the debating community.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h3 className="text-xl font-extrabold text-gray-900 mb-4">At a glance</h3>
            <dl className="space-y-3">
              <div className="flex items-baseline justify-between">
                <dt className="text-gray-500">Founded</dt>
                <dd className="font-extrabold text-gray-900">1993</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-gray-500">International Breaks</dt>
                <dd className="font-extrabold text-gray-900">100+*</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-gray-500">Local Titles</dt>
                <dd className="font-extrabold text-gray-900">50+*</dd>
              </div>
              <div className="flex items-baseline justify-between">
                <dt className="text-gray-500">Alumni Network</dt>
                <dd className="font-extrabold text-gray-900">Large & active</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-gray-500">
              *Illustrative counters—replace with official stats if needed.
            </p>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Achievements</h2>
          <p className="text-gray-600 mb-4">
            NSUDC has won the highest number of trophies for North South University and is
            recognized as the top-ranking team among Sub-continental teams.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              Regular participants in the World Universities Debate Tournament with remarkable
              international successes.
            </li>
            <li>
              Defending champions in multiple local English debate tournaments in Bangladesh.
            </li>
            <li>
              Strong performance in Bengali debates, reaching the top in many national tournaments.
            </li>
            <li>
              Consistently tops the list of breaking teams in tournaments, showcasing proficiency
              in both English and Bengali debating.
            </li>
          </ul>
        </section>

        {/* Milestones Section */}
        <section className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Milestones</h2>
          <ol className="relative border-s border-blue-200 ps-6 space-y-6">
            <li>
              <span className="absolute -start-[7px] mt-1.5 h-3 w-3 rounded-full bg-blue-600"></span>
              <h3 className="font-bold text-gray-900">1993 — Club Founded</h3>
              <p className="text-gray-600">First official student club of North South University.</p>
            </li>
            <li>
              <span className="absolute -start-[7px] mt-1.5 h-3 w-3 rounded-full bg-blue-600"></span>
              <h3 className="font-bold text-gray-900">2000s — National Circuit Rise</h3>
              <p className="text-gray-600">
                Multiple local titles and consistent national breaks.
              </p>
            </li>
            <li>
              <span className="absolute -start-[7px] mt-1.5 h-3 w-3 rounded-full bg-blue-600"></span>
              <h3 className="font-bold text-gray-900">2010s — International Recognition</h3>
              <p className="text-gray-600">
                Regular WUDC participation with notable speaker & team records.
              </p>
            </li>
            <li>
              <span className="absolute -start-[7px] mt-1.5 h-3 w-3 rounded-full bg-blue-600"></span>
              <h3 className="font-bold text-gray-900">2020s — Training & Outreach</h3>
              <p className="text-gray-600">
                Workshops, novice pipelines, and broader community programs.
              </p>
            </li>
          </ol>
        </section>

        {/* Mission and FAQ Section */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Mission</h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Foster critical thinking, effective communication, and leadership through debate
                tournaments inside and outside Bangladesh.
              </p>
              <p>
                Organize seminars, workshops, and inter/intra-university debate and public speaking
                contests with corporate partners.
              </p>
              <p>
                Maintain liaisons with the corporate sector and cultural groups within and beyond
                NSU.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">FAQ</h2>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 pb-3">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full cursor-pointer items-center justify-between text-left font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {faq.question}
                    <span
                      className={`text-blue-600 transition-transform duration-200 ${
                        openFAQ === index ? 'rotate-180' : ''
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFAQ === index ? 'max-h-40 mt-2' : 'max-h-0'
                    }`}
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-2">Ready to get started?</h3>
          <p className="text-blue-100 mb-6">
            Train with seniors, compete nationally & internationally, and grow your voice.
          </p>
          <a
            href="/register"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
          >
            Join the Legacy
          </a>
        </section>
      </main>
    </div>
  )
}
