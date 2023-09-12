import type { Prisma, UserAction } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserActionCreateArgs>({
  userAction: {
    one: {
      data: {
        action: 'LOGIN',
        target: 'String',
        targetId: 'String',
        user: {
          create: {
            email: 'String3763657',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        action: 'LOGIN',
        target: 'String',
        targetId: 'String',
        user: {
          create: {
            email: 'String3779568',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<UserAction, 'userAction'>
