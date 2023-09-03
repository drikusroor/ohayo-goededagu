import type { ImageGallery } from '@prisma/client'

import {
  imageGalleries,
  imageGallery,
  createImageGallery,
  updateImageGallery,
  deleteImageGallery,
} from './imageGalleries'
import type { StandardScenario } from './imageGalleries.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('imageGalleries', () => {
  scenario('returns all imageGalleries', async (scenario: StandardScenario) => {
    const result = await imageGalleries()

    expect(result.length).toEqual(Object.keys(scenario.imageGallery).length)
  })

  scenario(
    'returns a single imageGallery',
    async (scenario: StandardScenario) => {
      const result = await imageGallery({ id: scenario.imageGallery.one.id })

      expect(result).toEqual(scenario.imageGallery.one)
    }
  )

  scenario('deletes a imageGallery', async (scenario: StandardScenario) => {
    const original = (await deleteImageGallery({
      id: scenario.imageGallery.one.id,
    })) as ImageGallery
    const result = await imageGallery({ id: original.id })

    expect(result).toEqual(null)
  })
})
