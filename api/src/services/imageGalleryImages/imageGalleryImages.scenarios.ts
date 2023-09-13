import type { Prisma, ImageGalleryImage } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ImageGalleryImageCreateArgs>({
  imageGalleryImage: {
    one: {
      data: { imageId: 'String', url: 'String', imageGallery: { create: {} } },
    },
    two: {
      data: { imageId: 'String', url: 'String', imageGallery: { create: {} } },
    },
  },
})

export type StandardScenario = ScenarioData<
  ImageGalleryImage,
  'imageGalleryImage'
>
