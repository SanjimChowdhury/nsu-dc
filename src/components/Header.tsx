import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { Menu, ChevronDown, Mail, Clock, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const SocialIcon = ({ platform, className }: { platform: string; className?: string }) => {
  switch (platform) {
    case 'facebook':
      return <Facebook className={className} />
    case 'instagram':
      return <Instagram className={className} />
    case 'twitter':
      return <Twitter className={className} />
    case 'linkedin':
      return <Linkedin className={className} />
    default:
      return null
  }
}

export default async function Header() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const headerData = await payload.findGlobal({
    slug: 'header',
    depth: 2,
  })

  const logoUrl =
    (headerData?.logo as unknown as { url: string })?.url ||
    'https://placehold.co/120x50/FFFFFF/000000?text=LOGO&font=inter'

  const navItems = headerData.navItems || []
  const topBar = (headerData as any).topBar || {}

  return (
    <header className="site-header sticky top-0 z-50 shadow-sm">
      {/* Top Bar */}
      <div className="bg-[var(--primary)] text-white/80 text-xs font-medium hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="bg-white/10 p-1 rounded-full flex items-center justify-center">
                 <img src="/nsu-logo-small.png" alt="NSU" className="w-4 h-4 object-contain" />
              </span>
              North South University, Dhaka
            </span>
            {topBar.email && (
              <a href={`mailto:${topBar.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" />
                {topBar.email}
              </a>
            )}
            {topBar.hours && (
              <span className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" />
                {topBar.hours}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            {topBar.socialLinks?.map((social: any, index: number) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label={social.platform}
              >
                <SocialIcon platform={social.platform} className="w-3.5 h-3.5" />
              </a>
            ))}
            <Link href="/register" className="font-semibold hover:underline ml-2">
              Apply now
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="main-nav backdrop-blur-md bg-white/95 border-b border-[var(--card-stroke)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <img src={logoUrl} alt="NSU DC" className="h-12 w-auto transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="site-title font-extrabold text-lg leading-tight text-[var(--primary)]">NSU Debate Club</span>
              <span className="text-xs text-[var(--ink-light)] font-medium">Official NSU Student Organization</span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item: any, index: number) => (
              <NavItem key={index} item={item} />
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/resources" className="btn-secondary px-4 py-2 text-sm font-semibold rounded-lg transition-transform hover:-translate-y-0.5">
              Student Portal
            </Link>
            <Link href="/resources" className="btn-primary px-5 py-2 text-sm font-semibold rounded-lg transition-transform hover:-translate-y-0.5">
              Join NSUDC
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Menu">
                  <Menu className="h-6 w-6 text-[var(--primary)]" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>
                    <img src={logoUrl} alt="Logo" className="h-10 w-auto" />
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  <nav>
                    <Accordion type="single" collapsible className="w-full">
                      {navItems.map((item: any, index: number) => (
                        <MobileNavItem key={index} item={item} index={index} />
                      ))}
                    </Accordion>
                  </nav>
                  <div className="flex flex-col gap-3 mt-4 border-t pt-4">
                    <Link href="/register" className="btn-secondary px-4 py-2 text-center rounded-lg">
                      Student Portal
                    </Link>
                    <Link href="/register" className="btn-primary px-4 py-2 text-center rounded-lg">
                      Join NSUDC
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}

function NavItem({ item }: { item: any }) {
  if (item.type === 'link') {
    if (item.link) {
      const page = item.link as any
      return (
        <Link
          href={`/${page.slug}`}
          className="nav-link uppercase tracking-[0.08em] text-sm font-semibold hover:text-[var(--primary)] transition-colors"
        >
          {item.label}
        </Link>
      )
    } else {
      return (
        <span className="nav-link uppercase tracking-[0.08em] text-sm font-semibold cursor-default">
          {item.label}
        </span>
      )
    }
  }

  if (item.type === 'dropdown' && item.subLinks && item.subLinks.length > 0) {
    return (
      <div className="group relative">
        <button className="flex items-center gap-1 nav-link uppercase tracking-[0.08em] text-sm font-semibold hover:text-[var(--primary)] transition-colors">
          {item.label}
          <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
        </button>
        <div className="absolute left-0 top-full hidden group-hover:block bg-white border border-[var(--card-stroke)] rounded-lg shadow-lg min-w-[220px] z-50 p-2 mt-1">
          <ul className="space-y-1">
            {item.subLinks.map((subLink: any, index: number) => {
              const subPage = subLink.link as any
              return (
                <li key={index}>
                  <Link
                    href={`/${subPage.slug}`}
                    className="block px-4 py-2 text-sm text-[var(--ink)] hover:bg-[var(--surface-hover)] hover:text-[var(--primary)] rounded-md transition-colors"
                  >
                    {subLink.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  return null
}

function MobileNavItem({ item, index }: { item: any; index: number }) {
  if (item.type === 'link') {
    if (item.link) {
      const page = item.link as any
      return (
        <div className="border-b border-gray-100">
          <Link
            href={`/${page.slug}`}
            className="block py-3 text-base font-medium text-[var(--ink)] hover:text-[var(--primary)]"
          >
            {item.label}
          </Link>
        </div>
      )
    } else {
      return (
        <div className="border-b border-gray-100">
          <span className="block py-3 text-base font-medium text-[var(--ink)] cursor-default">
            {item.label}
          </span>
        </div>
      )
    }
  }

  if (item.type === 'dropdown' && item.subLinks && item.subLinks.length > 0) {
    return (
      <AccordionItem value={`item-${index}`} className="border-b border-gray-100">
        <AccordionTrigger className="text-base font-medium text-[var(--ink)] hover:text-[var(--primary)] py-3">
          {item.label}
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2 pl-4 pb-2">
            {item.subLinks.map((subLink: any, subIndex: number) => {
              const subPage = subLink.link as any
              return (
                <li key={subIndex}>
                  <Link
                    href={`/${subPage.slug}`}
                    className="block py-2 text-sm text-[var(--ink-light)] hover:text-[var(--primary)]"
                  >
                    {subLink.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </AccordionContent>
      </AccordionItem>
    )
  }

  return null
}
