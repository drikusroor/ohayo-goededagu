import type { Profile } from '@prisma/client'

import {
  profiles,
  profile,
  createProfile,
  updateProfile,
  deleteProfile,
} from './profiles'
import type { StandardScenario } from './profiles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('profiles', () => {
  scenario('returns all profiles', async (scenario: StandardScenario) => {
    const result = await profiles()

    expect(result.length).toEqual(Object.keys(scenario.profile).length)
  })

  scenario('returns a single profile', async (scenario: StandardScenario) => {
    const result = await profile({ id: scenario.profile.one.id })

    expect(result).toEqual(scenario.profile.one)
  })

  scenario('creates a profile', async (scenario: StandardScenario) => {
    mockCurrentUser({
      id: scenario.profile.two.userId,
      roles: ['USER'],
      email: 'info@example.com',
      name: 'Peter Pippeling',
    })

    await deleteProfile()

    const result = await createProfile({
      input: {
        avatar: '/avatar.png',
        bio: 'bio',
        name: 'Name',
        japaneseName: 'JapaneseName',
      },
    })

    expect(result.userId).toEqual(scenario.profile.two.userId)
    expect(result.avatar).toEqual('/avatar.png')
    expect(result.bio).toEqual('bio')
    expect(result.name).toEqual('Name')
    expect(result.japaneseName).toEqual('JapaneseName')
  })

  scenario('updates a profile', async (scenario: StandardScenario) => {
    mockCurrentUser({
      id: 123,
      roles: ['USER'],
      email: 'info@example.com',
      name: 'Peter Pippeling',
    })

    const original = (await profile({ id: scenario.profile.one.id })) as Profile
    const result = await updateProfile({
      id: original.id,
      input: { bio: 'Lol hahaha' },
    })

    expect(result.bio).toEqual('Lol hahaha')
  })

  scenario('deletes a profile', async (scenario: StandardScenario) => {
    mockCurrentUser({
      id: scenario.profile.one.userId,
      roles: ['USER'],
      email: 'info@example.com',
      name: 'Peter Pippeling',
    })

    const original = (await deleteProfile()) as Profile

    const result = await profile({ id: original.id })

    expect(result).toEqual(null)
  })
})
