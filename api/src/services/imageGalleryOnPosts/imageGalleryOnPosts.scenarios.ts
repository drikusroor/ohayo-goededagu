import type { Prisma, ImageGalleryOnPost } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ImageGalleryOnPostCreateArgs>({
  imageGalleryOnPost: {
    one: {
      data: {
        imageGallery: { create: { imageId: 'String', url: 'String' } },
        post: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String9778770',
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
        imageGallery: { create: { imageId: 'String', url: 'String' } },
        post: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String3196586',
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
