import React from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
}

/**
 * PageHeader Component
 * 
 * Reusable page header section with title and optional subtitle
 * Used across all new pages for consistent styling
 */
export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-white to-gray-50 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 animate-fade-in-up">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl text-gray-600 animate-fade-in-up animation-delay-100">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  )
}
