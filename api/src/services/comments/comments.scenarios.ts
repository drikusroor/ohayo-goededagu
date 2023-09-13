import type { Prisma, Comment } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      data: {
        body: 'String',
        user: {
          create: {
            email: 'String8255715',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        post: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String1210598',
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
        body: 'String',
        user: {
          create: {
            email: 'String2910522',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        post: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'String1315158',
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

export type StandardScenario = ScenarioData<Comment, 'comment'>
