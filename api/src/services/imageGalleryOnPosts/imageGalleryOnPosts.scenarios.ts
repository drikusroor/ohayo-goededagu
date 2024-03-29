import type { Prisma, ImageGalleryOnPost } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ImageGalleryOnPostCreateArgs>({
  imageGalleryOnPost: {
    one: {
      data: {
        imageGallery: { create: {} },
        post: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String3497095',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        imageGallery: { create: {} },
        post: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String2678795',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  ImageGalleryOnPost,
  'imageGalleryOnPost'
>
