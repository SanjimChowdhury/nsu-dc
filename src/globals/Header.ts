import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
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
        description: 'Logo image for the header',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          options: [
            {
              label: 'Link',
              value: 'link',
            },
            {
              label: 'Dropdown',
              value: 'dropdown',
            },
          ],
          defaultValue: 'link',
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            description: 'Display text for the navigation item',
          },
        },
        {
          name: 'link',
          type: 'relationship',
          relationTo: 'pages',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'link',
            description: 'Page to link to (only for Link type)',
          },
        },
        {
          name: 'subLinks',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'dropdown',
            description: 'Dropdown menu items (only for Dropdown type)',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'topBar',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'email',
          label: 'Contact Email',
        },
        {
          name: 'hours',
          type: 'text',
          label: 'Club Hours',
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: [
            {
              name: 'platform',
              type: 'select',
              options: [
                { label: 'Facebook', value: 'facebook' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Twitter', value: 'twitter' },
                { label: 'LinkedIn', value: 'linkedin' },
              ],
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
