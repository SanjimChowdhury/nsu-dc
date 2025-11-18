import type { GlobalConfig } from 'payload'

export const AboutUs: GlobalConfig = {
  slug: 'about-us',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Logo image for the about us section',
      },
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      defaultValue: 'About Us',
      admin: {
        description: 'Small label text above the main heading (e.g., "About Us")',
      },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description: 'Main heading for the about us section (e.g., "NSU YES!")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Long description text for the about us section',
      },
    },
  ],
}
