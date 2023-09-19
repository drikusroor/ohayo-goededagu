import type { PostThumb } from '@prisma/client'

import {
  postThumbs,
  postThumb,
  createPostThumb,
  updatePostThumb,
  deletePostThumb,
} from './postThumbs'
import type { StandardScenario } from './postThumbs.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('postThumbs', () => {
  scenario('returns all postThumbs', async (scenario: StandardScenario) => {
    const result = await postThumbs()

    expect(result.length).toEqual(Object.keys(scenario.postThumb).length)
  })

  scenario('returns a single postThumb', async (scenario: StandardScenario) => {
    const result = await postThumb({ id: scenario.postThumb.one.id })

    expect(result).toEqual(scenario.postThumb.one)
  })

  scenario('creates a postThumb', async (scenario: StandardScenario) => {
    const result = await createPostThumb({
      input: {
        userId: scenario.postThumb.two.userId,
        postId: scenario.postThumb.two.postId,
      },
    })

    expect(result.userId).toEqual(scenario.postThumb.two.userId)
    expect(result.postId).toEqual(scenario.postThumb.two.postId)
  })

  scenario('updates a postThumb', async (scenario: StandardScenario) => {
    const original = (await postThumb({
      id: scenario.postThumb.one.id,
    })) as PostThumb
    const result = await updatePostThumb({
      id: original.id,
      input: { userId: scenario.postThumb.two.userId },
    })

    expect(result.userId).toEqual(scenario.postThumb.two.userId)
  })

  scenario('deletes a postThumb', async (scenario: StandardScenario) => {
    const original = (await deletePostThumb({
      id: scenario.postThumb.one.id,
    })) as PostThumb
    const result = await postThumb({ id: original.id })

    expect(result).toEqual(null)
  })
})
