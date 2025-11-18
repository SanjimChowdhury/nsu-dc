import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroSlides',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Background image for the hero slide',
          },
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Main heading text for the slide',
          },
        },
        {
          name: 'subtext',
          type: 'text',
          admin: {
            description: 'Subtitle or supporting text for the slide',
          },
        },
      ],
    },
  ],
}
