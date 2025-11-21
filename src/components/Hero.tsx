'use client'

import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import { useRef } from 'react'

/**
 * Hero Component
 *
 * Displays an auto-playing carousel of hero slides with full-height images
 * and overlaid text content.
 *
 * Features:
 * - Auto-plays every 5 seconds
 * - Full viewport height (70vh)
 * - Dark overlay for text readability
 * - Centered text with title and subtext
 * - Responsive design
 *
 * Props:
 * - slides: Array of hero slide objects from Payload CMS Home Global
 *   Each slide contains: image, title, and subtext
 */
interface HeroSlide {
  image: {
    url: string
    alt?: string
  }
  title?: string
  subtext?: string
}

interface HeroProps {
  slides: HeroSlide[]
}

export default function Hero({ slides }: HeroProps) {
  // Initialize autoplay plugin for carousel
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))

  // Fallback images that cycle based on slide index
  const fallbackImages = ['/IMG_7288.jpg', '/IMG_7188.jpg', '/IMG_7185.jpg']

  return (
    <section className="w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: 'start',
          loop: true,
        }}
      >
        <CarouselContent>
          {slides.map((slide, index) => {
            // Get fallback image by cycling through the array
            const fallbackImage = fallbackImages[index % fallbackImages.length]
            
            return (
              <CarouselItem key={index}>
                <div className="relative h-[70vh] w-full overflow-hidden">
                  {/* Background Image */}
                  <Image
                    src={slide.image.url || fallbackImage}
                    alt={slide.image.alt || slide.title || `Hero slide ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0} // Prioritize loading first image
                  />

                {/* Dark Overlay for Text Readability */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Text Content Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                  {slide.title && (
                    <h1
                      className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4"
                      style={{
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      {slide.title}
                    </h1>
                  )}
                  {slide.subtext && (
                    <p
                      className="text-lg md:text-xl lg:text-2xl text-white max-w-3xl"
                      style={{
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                      }}
                    >
                      {slide.subtext}
                    </p>
                  )}
                </div>
              </div>
            </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </section>
  )
}
