import type { Prisma, PostThumb } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PostThumbCreateArgs>({
  postThumb: {
    one: {
      data: {
        up: true,
        user: {
          create: {
            email: 'String9857530',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        post: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String3658618',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        up: false,
        user: {
          create: {
            email: 'String9064211',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        post: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String3783093',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<PostThumb, 'postThumb'>
