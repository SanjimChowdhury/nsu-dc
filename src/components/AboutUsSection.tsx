/**
 * About Us Section Component
 *
 * Desktop View (md and up):
 * - Logo on the left side
 * - Text content (label, heading, description) on the right side
 *
 * Mobile View (below md):
 * - Logo on top (full width or centered)
 * - Text content below logo (centered)
 */

import Image from 'next/image'

interface AboutUsSectionProps {
  logo: string;
  label: string;
  heading: string;
  description: string;
}

export default function AboutUsSection({
  logo,
  label,
  heading,
  description,
}: AboutUsSectionProps) {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Layout - Side by Side */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 items-center">
          {/* Logo on Left */}
          <div className="flex justify-center">
            <Image
              src={logo}
              alt="About Us Logo"
              width={320}
              height={320}
              className="h-80 w-auto object-contain"
            />
          </div>

          {/* Content on Right */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                {label}
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
                {heading}
              </h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="md:hidden space-y-8">
          {/* Logo on Top */}
          <div className="flex justify-center">
            <Image
              src={logo}
              alt="About Us Logo"
              width={192}
              height={192}
              className="h-48 w-auto object-contain"
            />
          </div>

          {/* Content Below */}
          <div className="space-y-4 text-center">
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                {label}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
                {heading}
              </h2>
            </div>
            <p className="text-base text-gray-700 leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
