import type { Prisma, UserSubscription } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserSubscriptionCreateArgs>({
  userSubscription: {
    one: {
      data: {
        type: 'POST_AUTHOR',
        target: 3582616,
        user: {
          create: {
            email: 'String309799',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        type: 'POST_AUTHOR',
        target: 4576454,
        user: {
          create: {
            email: 'String2968877',
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
