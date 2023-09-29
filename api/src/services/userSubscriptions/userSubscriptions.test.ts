import type { UserSubscription } from '@prisma/client'

import {
  userSubscriptions,
  userSubscription,
  createUserSubscription,
  updateUserSubscription,
  deleteUserSubscription,
} from './userSubscriptions'
import type { StandardScenario } from './userSubscriptions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userSubscriptions', () => {
  scenario(
    'returns all userSubscriptions',
    async (scenario: StandardScenario) => {
      const result = await userSubscriptions()

      expect(result.length).toEqual(
        Object.keys(scenario.userSubscription).length
      )
    }
  )

  scenario(
    'returns a single userSubscription',
    async (scenario: StandardScenario) => {
      const result = await userSubscription({
        id: scenario.userSubscription.one.id,
      })

      expect(result).toEqual(scenario.userSubscription.one)
    }
  )

  scenario('creates a userSubscription', async (scenario: StandardScenario) => {
    const result = await createUserSubscription({
      input: {
        userId: scenario.userSubscription.two.userId,
        type: 'POST_AUTHOR',
      },
    })

    expect(result.userId).toEqual(scenario.userSubscription.two.userId)
    expect(result.type).toEqual('POST_AUTHOR')
  })

  scenario('updates a userSubscription', async (scenario: StandardScenario) => {
    const original = (await userSubscription({
      id: scenario.userSubscription.one.id,
    })) as UserSubscription
    const result = await updateUserSubscription({
      id: original.id,
      input: { type: 'COMMENT' },
    })

    expect(result.type).toEqual('COMMENT')
  })

  scenario('deletes a userSubscription', async (scenario: StandardScenario) => {
    const original = (await deleteUserSubscription({
      id: scenario.userSubscription.one.id,
    })) as UserSubscription
    const result = await userSubscription({ id: original.id })

    expect(result).toEqual(null)
  })
})
