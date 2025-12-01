import { getPayload } from 'payload'
import config from '@/payload.config'
import Hero from '@/components/Hero'
import MotionGenerator from '@/components/MotionGenerator'
import type { HeroSlide } from '@/types/navigation'

/**
 * Home Page
 *
 * Main landing page that composes the Header and Hero components.
 * Fetches hero slide data from Payload CMS Home Global and passes it to Hero component.
 */
export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch home page data from Payload CMS
  const homeData = await payload.findGlobal({
    slug: 'home',
  })

  // Transform hero slides data to match Hero component props
  const heroSlides = (homeData.heroSlides || []).map((slide: unknown) => {
    const s = slide as HeroSlide
    return {
      image: {
        url: s.image?.url || '',
        alt: s.image?.alt || s.title || '',
      },
      title: s.title || '',
      subtext: s.subtext || '',
    }
  })

  return (
    <div className="min-h-screen">
      <Hero slides={heroSlides} />
      <MotionGenerator />
    </div>
  )
}
