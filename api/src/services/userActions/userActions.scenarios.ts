import type { Prisma, UserAction } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserActionCreateArgs>({
  userAction: {
    one: {
      data: {
        action: 'LOGIN',
        user: {
          create: {
            email: 'String1532930',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        action: 'LOGIN',
        user: {
          create: {
            email: 'String6160504',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserAction, 'userAction'>
