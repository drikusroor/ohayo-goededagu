import type { Prisma, Profile } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ProfileCreateArgs>({
  profile: {
    one: {
      data: {
        updatedAt: '2023-06-18T07:18:13.220Z',
        user: {
          create: {
            email: 'String2331705',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2023-06-18T07:18:13.220Z',
        user: {
          create: {
            email: 'String3717739',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Profile, 'profile'>
