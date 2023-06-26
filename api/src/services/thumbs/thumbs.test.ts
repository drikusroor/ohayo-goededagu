import type { Thumb } from '@prisma/client'

import { thumbs, thumb, createThumb, updateThumb, deleteThumb } from './thumbs'
import type { StandardScenario } from './thumbs.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('thumbs', () => {
  scenario('returns all thumbs', async (scenario: StandardScenario) => {
    const result = await thumbs()

    expect(result.length).toEqual(Object.keys(scenario.thumb).length)
  })

  scenario('returns a single thumb', async (scenario: StandardScenario) => {
    const result = await thumb({ id: scenario.thumb.one.id })

    expect(result).toEqual(scenario.thumb.one)
  })

  scenario('creates a thumb', async (scenario: StandardScenario) => {
    const result = await createThumb({
      input: {
        userId: scenario.thumb.two.userId,
        commentId: scenario.thumb.two.commentId,
        up: true,
      },
    })

    expect(result.userId).toEqual(scenario.thumb.two.userId)
    expect(result.commentId).toEqual(scenario.thumb.two.commentId)
    expect(result.up).toEqual(true)
  })

  scenario('updates a thumb', async (scenario: StandardScenario) => {
    const original = (await thumb({ id: scenario.thumb.one.id })) as Thumb
    const result = await updateThumb({
      id: original.id,
      input: { up: false },
    })

    expect(result.up).toEqual(false)
  })

  scenario('deletes a thumb', async (scenario: StandardScenario) => {
    const original = (await deleteThumb({ id: scenario.thumb.one.id })) as Thumb
    const result = await thumb({ id: original.id })

    expect(result).toEqual(null)
  })
})
