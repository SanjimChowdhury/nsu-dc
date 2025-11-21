'use client'

import React, { useEffect, useState } from 'react'

interface CountdownTimerProps {
  targetDate: string // ISO 8601 format
  title?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

/**
 * CountdownTimer Component
 * 
 * Displays a live countdown timer to a target date
 * Used in Achievements and Coming Soon pages
 */
export default function CountdownTimer({ targetDate, title }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const target = new Date(targetDate).getTime()
      const now = new Date().getTime()
      const distance = target - now

      if (distance < 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 text-center transform hover:scale-105">
      <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs md:text-sm text-gray-600 font-medium mt-1">{label}</div>
    </div>
  )

  return (
    <div className="text-center">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-4 gap-3 md:gap-4 max-w-md mx-auto">
        <TimeUnit value={timeLeft.days} label="Days" />
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Minutes" />
        <TimeUnit value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  )
}
