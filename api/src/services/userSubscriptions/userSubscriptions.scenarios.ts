import type { Prisma, UserSubscription } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserSubscriptionCreateArgs>({
  userSubscription: {
    one: {
      data: {
        type: 'POST_AUTHOR',
        target: 123,
        user: {
          create: {
            email: 'String873498',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        type: 'POST_AUTHOR',
        target: 666,
        user: {
          create: {
            email: 'String9691098',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  UserSubscription,
  'userSubscription'
>
