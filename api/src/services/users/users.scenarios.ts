import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String5204076',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
    two: {
      data: {
        email: 'String2203009',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
    three: {
      data: {
        email: 'drikusroor@gmail.com',
        hashedPassword:
          'd620f858a26c4d89e8fe36a618741f789be6d2f20be70169aaaf92dca7428100',
        salt: '377faec8a18922be3ba758089cad7fae',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
