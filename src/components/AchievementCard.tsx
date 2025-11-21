import React from 'react'

interface AchievementCardProps {
  icon: string
  title: string
  description: string
  stat: string
  colorClass: 'yellow' | 'blue' | 'green' | 'purple' | 'red' | 'indigo'
}

/**
 * AchievementCard Component
 * 
 * Displays an individual achievement with icon, title, description, and stat
 * Used in the Achievements page
 */
export default function AchievementCard({
  icon,
  title,
  description,
  stat,
  colorClass,
}: AchievementCardProps) {
  const colorMap = {
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      statText: 'text-yellow-700',
    },
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
      statText: 'text-blue-700',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      statText: 'text-green-700',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
      statText: 'text-purple-700',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      statText: 'text-red-700',
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-700',
      statText: 'text-indigo-700',
    },
  }

  const colors = colorMap[colorClass]

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 transform hover:-translate-y-1">
      <div
        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${colors.bg} ${colors.text} text-2xl`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-extrabold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-3">{description}</p>
      <div className={`text-sm font-semibold ${colors.statText}`}>{stat}</div>
    </div>
  )
}
