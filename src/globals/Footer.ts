import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
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
        description: 'Logo image for the footer',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Footer Description',
      admin: {
        description: 'Text to display below the logo',
      },
    },
    {
      name: 'connectLinks',
      type: 'array',
      label: 'Connect Links',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL or Mailto Link',
        },
        {
          name: 'newTab',
          type: 'checkbox',
          label: 'Open in new tab',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      defaultValue: 'North South University, Dhaka, Bangladesh',
    },
  ],
}
