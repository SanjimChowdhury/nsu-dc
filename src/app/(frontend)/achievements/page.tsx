import React from 'react'
import PageHeader from '@/components/PageHeader'
import CountdownTimer from '@/components/CountdownTimer'
import AchievementCard from '@/components/AchievementCard'

/**
 * Achievements Page
 * 
 * Displays NSUDC achievements, upcoming tournament countdown, and recognition
 */
export default function AchievementsPage() {
  // Set target date for next tournament (example: December 15, 2025)
  const tournamentDate = '2025-12-15T10:00:00+06:00'

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Achievements & Recognition"
        subtitle="Celebrating excellence in debate and public speaking"
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12 space-y-12">
        {/* Countdown Section */}
        <section className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
              Next Major Tournament
            </h2>
            <p className="text-gray-600">NSU Inter-University Debate Championship 2025</p>
          </div>
          <CountdownTimer targetDate={tournamentDate} />
        </section>

        {/* Achievements Grid */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AchievementCard
            icon="🏆"
            title="World Championships"
            description="Multiple breaking teams at WUDC with outstanding performances"
            stat="15+ International Breaks"
            colorClass="yellow"
          />

          <AchievementCard
            icon="🥇"
            title="National Champions"
            description="Defending champions in multiple local tournaments"
            stat="50+ National Titles"
            colorClass="blue"
          />

          <AchievementCard
            icon="🎯"
            title="Best Speakers"
            description="Individual excellence recognized across tournaments"
            stat="100+ Speaker Awards"
            colorClass="green"
          />

          <AchievementCard
            icon="🌟"
            title="Alumni Network"
            description="Strong network of professionals and leaders"
            stat="500+ Alumni"
            colorClass="purple"
          />

          <AchievementCard
            icon="🏅"
            title="Regional Dominance"
            description="Top-ranking team among Sub-continental teams"
            stat="#1 in Region"
            colorClass="red"
          />

          <AchievementCard
            icon="📚"
            title="Academic Excellence"
            description="Research and training programs recognized nationally"
            stat="Excellence Awards"
            colorClass="indigo"
          />
        </section>
      </main>
    </div>
  )
}
