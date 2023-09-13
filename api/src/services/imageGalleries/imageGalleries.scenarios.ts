import type { Prisma, ImageGallery } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ImageGalleryCreateArgs>({
  imageGallery: { one: { data: {} }, two: { data: {} } },
})

export type StandardScenario = ScenarioData<ImageGallery, 'imageGallery'>
