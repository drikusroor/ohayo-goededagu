import type { Prisma, ImageGallery } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ImageGalleryCreateArgs>({
  imageGallery: {
    one: { data: { imageId: 'String', url: 'String' } },
    two: { data: { imageId: 'String', url: 'String' } },
  },
})

export type StandardScenario = ScenarioData<ImageGallery, 'imageGallery'>
