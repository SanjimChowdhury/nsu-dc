'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { NavItem, Page, SubLink } from '@/types/navigation'

interface MobileMenuProps {
  logoUrl: string
  navItems: NavItem[]
}

export default function MobileMenu({ logoUrl, navItems }: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  const closeSheet = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Menu">
          <Menu className="h-6 w-6 text-[var(--primary)]" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>
            <Image src={logoUrl} alt="Logo" width={120} height={40} className="h-10 w-auto" />
          </SheetTitle>
        </SheetHeader>
        <div className="mt-8 flex flex-col gap-4">
          <nav>
            <Accordion type="single" collapsible className="w-full">
              {navItems.map((item: NavItem, index: number) => (
                <MobileNavItem key={index} item={item} index={index} onLinkClick={closeSheet} />
              ))}
            </Accordion>
          </nav>
          <div className="flex flex-col gap-3 mt-4 border-t pt-4">
            <Link href="/register" className="btn-secondary px-4 py-2 text-center rounded-lg" onClick={closeSheet}>
              Student Portal
            </Link>
            <Link href="/register" className="btn-primary px-4 py-2 text-center rounded-lg" onClick={closeSheet}>
              Join NSUDC
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function MobileNavItem({ item, index, onLinkClick }: { item: NavItem; index: number; onLinkClick: () => void }) {
  if (item.type === 'link') {
    if (item.link) {
      const page = item.link as Page
      return (
        <div className="border-b border-gray-100">
          <Link
            href={`/${page.slug}`}
            className="block py-3 text-base font-medium text-[var(--ink)] hover:text-[var(--primary)]"
            onClick={onLinkClick}
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
            {item.subLinks.map((subLink: SubLink, subIndex: number) => {
              const subPage = subLink.link as Page
              return (
                <li key={subIndex}>
                  <Link
                    href={`/${subPage.slug}`}
                    className="block py-2 text-sm text-[var(--ink-light)] hover:text-[var(--primary)]"
                    onClick={onLinkClick}
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
