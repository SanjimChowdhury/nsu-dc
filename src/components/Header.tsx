import { getPayload } from 'payload'
import config from '@/payload.config'
import Link from 'next/link'
import { Menu, ChevronDown } from 'lucide-react'
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

/**
 * Header Component
 *
 * A responsive header that fetches navigation data from Payload CMS Header Global.
 *
 * Desktop View (md and up):
 * - Displays logo in center with navigation items split on left and right
 * - Uses NavigationMenu for dropdown items
 * - Simple links for non-dropdown items
 *
 * Mobile View (below md):
 * - Shows logo on left, hamburger menu on right
 * - Uses Sheet (side drawer) for mobile navigation
 * - Uses Accordion for dropdown items in mobile view
 */
export default async function Header() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch header data from Payload CMS
  const headerData = await payload.findGlobal({
    slug: 'header',
    depth: 2,
  })

  // Logo placeholder URL
  const logoUrl =
    (headerData?.logo as unknown as { url: string })?.url ||
    'https://placehold.co/120x50/FFFFFF/000000?text=LOGO&font=inter'

  // Split navigation items into left and right for desktop view
  // Based on the reference image: 3 items on left, logo in center, 3 items on right
  const navItems = headerData.navItems || []
  const midPoint = Math.ceil(navItems.length / 2)
  const leftNavItems = navItems.slice(0, midPoint)
  const rightNavItems = navItems.slice(midPoint)

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          {/* Left Navigation Items */}
          <nav className="flex items-center space-x-1">
            {leftNavItems.map((item: any, index: number) => (
              <NavItem key={index} item={item} />
            ))}
          </nav>

          {/* Logo in Center */}
          <Link href="/" className="shrink-0 mx-8">
            <img src={logoUrl} alt="Logo" className="h-24 w-auto" />
          </Link>

          {/* Right Navigation Items */}
          <nav className="flex items-center space-x-1">
            {rightNavItems.map((item: any, index: number) => (
              <NavItem key={index} item={item} />
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          {/* Logo on Left */}
          <Link href="/">
            <img src={logoUrl} alt="Logo" className="h-14 w-auto" />
          </Link>

          {/* Hamburger Menu on Right */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-2" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>
                  <img src={logoUrl} alt="Logo" className="h-10 w-auto" />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8">
                <Accordion type="single" collapsible className="w-full">
                  {navItems.map((item: any, index: number) => (
                    <MobileNavItem key={index} item={item} index={index} />
                  ))}
                </Accordion>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

/**
 * Desktop Navigation Item Component
 * Renders either a simple link or a dropdown menu based on item type
 */
function NavItem({ item }: { item: any }) {
  if (item.type === 'link') {
    if (item.link) {
      const page = item.link as any
      return (
        <Link
          href={`/${page.slug}`}
          className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          {item.label}
        </Link>
      )
    } else {
      return (
        <span className="px-4 py-2 text-sm font-medium text-gray-700 cursor-default">
          {item.label}
        </span>
      )
    }
  }

  if (item.type === 'dropdown' && item.subLinks && item.subLinks.length > 0) {
    return (
      <div className="group relative">
        <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors group-hover:border-b-2 group-hover:border-gray-900">
          {item.label}
          <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
        </button>
        <div className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg min-w-[220px] z-50">
          <ul className="py-2">
            {item.subLinks.map((subLink: any, index: number) => {
              const subPage = subLink.link as any
              return (
                <li key={index}>
                  <Link
                    href={`/${subPage.slug}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
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

/**
 * Mobile Navigation Item Component
 * Renders either a simple link or an accordion item for dropdowns
 */
function MobileNavItem({ item, index }: { item: any; index: number }) {
  if (item.type === 'link') {
    if (item.link) {
      const page = item.link as any
      return (
        <div className="border-b">
          <Link
            href={`/${page.slug}`}
            className="block py-4 text-base font-medium text-gray-700 hover:text-gray-900"
          >
            {item.label}
          </Link>
        </div>
      )
    } else {
      return (
        <div className="border-b">
          <span className="block py-4 text-base font-medium text-gray-700 cursor-default">
            {item.label}
          </span>
        </div>
      )
    }
  }

  if (item.type === 'dropdown' && item.subLinks && item.subLinks.length > 0) {
    return (
      <AccordionItem value={`item-${index}`}>
        <AccordionTrigger className="text-base font-medium text-gray-700 hover:text-gray-900">
          {item.label}
        </AccordionTrigger>
        <AccordionContent>
          <ul className="space-y-2 pl-4">
            {item.subLinks.map((subLink: any, subIndex: number) => {
              const subPage = subLink.link as any
              return (
                <li key={subIndex}>
                  <Link
                    href={`/${subPage.slug}`}
                    className="block py-2 text-sm text-gray-600 hover:text-gray-900"
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
