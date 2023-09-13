import type { UserAction } from '@prisma/client'

import {
  userActions,
  userAction,
  createUserAction,
  deleteUserAction,
} from './userActions'
import type { StandardScenario } from './userActions.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('userActions', () => {
  scenario('returns all userActions', async (scenario: StandardScenario) => {
    const result = await userActions()

    expect(result.length).toEqual(Object.keys(scenario.userAction).length)
  })

  scenario(
    'returns a single userAction',
    async (scenario: StandardScenario) => {
      const result = await userAction({ id: scenario.userAction.one.id })

      expect(result).toEqual(scenario.userAction.one)
    }
  )

  scenario('creates a userAction', async (scenario: StandardScenario) => {
    const result = await createUserAction({
      input: { userId: scenario.userAction.two.userId, action: 'LOGIN' },
    })

    expect(result.userId).toEqual(scenario.userAction.two.userId)
    expect(result.action).toEqual('LOGIN')
  })

  scenario('deletes a userAction', async (scenario: StandardScenario) => {
    const original = (await deleteUserAction({
      id: scenario.userAction.one.id,
    })) as UserAction
    const result = await userAction({ id: original.id })

    expect(result).toEqual(null)
  })
})
