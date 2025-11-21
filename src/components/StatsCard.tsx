'use client'

import React, { useEffect, useRef, useState } from 'react'

interface StatsCardProps {
  value: number
  suffix?: string
  label: string
  delay?: number
}

/**
 * StatsCard Component
 * 
 * Displays an animated statistic with counter animation
 * Used in the About page statistics section
 */
export default function StatsCard({ value, suffix = '', label, delay = 0 }: StatsCardProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = value / steps
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      if (currentStep >= steps) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(increment * currentStep))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 text-center transform hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-gray-600 font-medium">{label}</div>
    </div>
  )
}
