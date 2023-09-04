import type { ImageGalleryImage } from '@prisma/client'

import {
  imageGalleryImages,
  imageGalleryImage,
  createImageGalleryImage,
  updateImageGalleryImage,
  deleteImageGalleryImage,
} from './imageGalleryImages'
import type { StandardScenario } from './imageGalleryImages.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('imageGalleryImages', () => {
  scenario(
    'returns all imageGalleryImages',
    async (scenario: StandardScenario) => {
      const result = await imageGalleryImages()

      expect(result.length).toEqual(
        Object.keys(scenario.imageGalleryImage).length
      )
    }
  )

  scenario(
    'returns a single imageGalleryImage',
    async (scenario: StandardScenario) => {
      const result = await imageGalleryImage({
        id: scenario.imageGalleryImage.one.id,
      })

      expect(result).toEqual(scenario.imageGalleryImage.one)
    }
  )

  scenario(
    'creates a imageGalleryImage',
    async (scenario: StandardScenario) => {
      const result = await createImageGalleryImage({
        input: {
          imageId: 'String',
          url: 'String',
          imageGalleryId: scenario.imageGalleryImage.two.imageGalleryId,
        },
      })

      expect(result.imageId).toEqual('String')
      expect(result.url).toEqual('String')
      expect(result.imageGalleryId).toEqual(
        scenario.imageGalleryImage.two.imageGalleryId
      )
    }
  )

  scenario(
    'updates a imageGalleryImage',
    async (scenario: StandardScenario) => {
      const original = (await imageGalleryImage({
        id: scenario.imageGalleryImage.one.id,
      })) as ImageGalleryImage
      const result = await updateImageGalleryImage({
        id: original.id,
        input: { imageId: 'String2' },
      })

      expect(result.imageId).toEqual('String2')
    }
  )

  scenario(
    'deletes a imageGalleryImage',
    async (scenario: StandardScenario) => {
      const original = (await deleteImageGalleryImage({
        id: scenario.imageGalleryImage.one.id,
      })) as ImageGalleryImage
      const result = await imageGalleryImage({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
