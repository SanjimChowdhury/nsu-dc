import React from 'react'
import PageHeader from '@/components/PageHeader'

/**
 * Events Page
 * 
 * Displays tournaments, workshops, and community engagements by NSUDC
 * Currently shows empty state, ready for future events integration
 */
export default function EventsPage() {
  // Future: Fetch events from Payload CMS or API
  const events: any[] = []

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Events"
        subtitle="Tournaments, workshops, and community engagements by NSUDC"
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Events Grid - Empty State */}
        {events.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Events Right Now</h3>
              <p className="text-gray-600">
                We're planning exciting events and tournaments. Check back soon for updates, or
                follow us on social media to stay informed!
              </p>
              <div className="mt-6 flex gap-4 justify-center">
                <a
                  href="https://facebook.com/nsudc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Follow on Facebook
                </a>
              </div>
            </div>
          </div>
        ) : (
          // Future: Events grid when data is available
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 transform hover:-translate-y-1"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                <div className="text-xs text-gray-500">{event.date}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
