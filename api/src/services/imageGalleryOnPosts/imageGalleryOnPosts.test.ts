import type { ImageGalleryOnPost } from '@prisma/client'

import {
  imageGalleryOnPosts,
  imageGalleryOnPost,
  createImageGalleryOnPost,
  updateImageGalleryOnPost,
  deleteImageGalleryOnPost,
} from './imageGalleryOnPosts'
import type { StandardScenario } from './imageGalleryOnPosts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('imageGalleryOnPosts', () => {
  scenario(
    'returns all imageGalleryOnPosts',
    async (scenario: StandardScenario) => {
      const result = await imageGalleryOnPosts()

      expect(result.length).toEqual(
        Object.keys(scenario.imageGalleryOnPost).length
      )
    }
  )

  scenario(
    'returns a single imageGalleryOnPost',
    async (scenario: StandardScenario) => {
      const result = await imageGalleryOnPost({
        id: scenario.imageGalleryOnPost.one.id,
      })

      expect(result).toEqual(scenario.imageGalleryOnPost.one)
    }
  )

  scenario(
    'creates a imageGalleryOnPost',
    async (scenario: StandardScenario) => {
      const result = await createImageGalleryOnPost({
        input: {
          imageGalleryId: scenario.imageGalleryOnPost.two.imageGalleryId,
          postId: scenario.imageGalleryOnPost.two.postId,
        },
      })

      expect(result.imageGalleryId).toEqual(
        scenario.imageGalleryOnPost.two.imageGalleryId
      )
      expect(result.postId).toEqual(scenario.imageGalleryOnPost.two.postId)
    }
  )

  scenario(
    'updates a imageGalleryOnPost',
    async (scenario: StandardScenario) => {
      const original = (await imageGalleryOnPost({
        id: scenario.imageGalleryOnPost.one.id,
      })) as ImageGalleryOnPost
      const result = await updateImageGalleryOnPost({
        id: original.id,
        input: {
          imageGalleryId: scenario.imageGalleryOnPost.two.imageGalleryId,
        },
      })

      expect(result.imageGalleryId).toEqual(
        scenario.imageGalleryOnPost.two.imageGalleryId
      )
    }
  )

  scenario(
    'deletes a imageGalleryOnPost',
    async (scenario: StandardScenario) => {
      const original = (await deleteImageGalleryOnPost({
        id: scenario.imageGalleryOnPost.one.id,
      })) as ImageGalleryOnPost
      const result = await imageGalleryOnPost({ id: original.id })

      expect(result).toEqual(null)
    }
  )
})
