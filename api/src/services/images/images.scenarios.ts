import type { Prisma, Image } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ImageCreateArgs>({
  image: {
    one: { data: { imageId: 'String', url: 'String', postId: 4569971 } },
    two: { data: { imageId: 'String', url: 'String', postId: 8739523 } },
  },
})

export type StandardScenario = ScenarioData<Image, 'image'>
