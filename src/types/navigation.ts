// Navigation types for Header and Footer components

export interface Page {
  slug: string
  title?: string
  id?: string
}

export interface SubLink {
  label: string
  link: Page
}

export interface NavItem {
  label: string
  type: 'link' | 'dropdown'
  link?: Page
  subLinks?: SubLink[]
}

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin'
  url: string
}

export interface TopBar {
  email?: string
  hours?: string
  socialLinks?: SocialLink[]
}

export interface ConnectLink {
  label: string
  url: string
  newTab: boolean
}

// Hero and Events types

export interface HeroSlide {
  image?: {
    url?: string
    alt?: string
  }
  title?: string
  subtext?: string
}

export interface Event {
  title: string
  description: string
  date: string
}
