import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import Image from 'next/image'
import type { NavItem, Page, ConnectLink } from '@/types/navigation'

export default async function Footer() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const footerData = await payload.findGlobal({
    slug: 'footer',
    depth: 2,
  })

  // Fetch header data to get navItems
  const headerData = await payload.findGlobal({
    slug: 'header',
    depth: 2,
  })

  const logoUrl =
    (footerData?.logo as unknown as { url: string })?.url ||
    '/nsudc-logo-1.png'

  // Use navItems from header, filter to only show top-level links
  const navItems = (headerData.navItems || []) as NavItem[]
  const quickLinks = navItems.filter((item: NavItem) => item.type === 'link' && item.link)
  // Hardcoded connect links (will be integrated with Payload later)
  const connectLinks: ConnectLink[] = [
    {
      label: 'debate.club@northsouth.edu',
      url: 'mailto:debate.club@northsouth.edu',
      newTab: false,
    },
    {
      label: 'Facebook',
      url: 'https://facebook.com/nsudc93',
      newTab: true,
    },
    {
      label: 'Instagram',
      url: 'https://instagram.com/nsudc',
      newTab: true,
    },
  ]
  
  const description = footerData.description || ''
  const address = footerData.address || ''

  return (
    <footer className="site-footer bg-[var(--primary)] text-white mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="block">
              <Image src={logoUrl} alt="NSUDC" width={120} height={40} className="h-10 w-auto" />
            </Link>
            <div className="mt-4">
              <h3 className="font-extrabold text-lg">NSU Debate Club</h3>
              <p className="text-sm text-white/80">Building Leaders Since 1993</p>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mt-4">
              {description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-3 text-sm uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((item: NavItem, index: number) => {
                const page = item.link as Page
                // Skip if page or slug is not available
                if (!page || !page.slug) return null
                return (
                  <li key={index}>
                    <Link 
                      href={`/${page.slug}`} 
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="font-bold mb-3 text-sm uppercase tracking-wide">Connect</h4>
            <ul className="space-y-2 text-sm">
              {connectLinks.map((item: ConnectLink, index: number) => (
                <li key={index}>
                  <a 
                    href={item.url} 
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <p>© <span id="year">{new Date().getFullYear()}</span> NSU Debate Club. All rights reserved.</p>
          <p>{address}</p>
        </div>
      </div>
    </footer>
  )
}
