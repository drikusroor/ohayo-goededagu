import type { Prisma, Comment } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      data: {
        body: 'String',
        user: {
          create: {
            email: 'String3508821',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        post: {
          create: {
            title: 'String',
            body: 'String',
            user: {
              create: {
                email: 'String9287089',
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
            email: 'String4985428',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        post: {
          create: {
            title: 'String',
            body: 'String',
            user: {
              create: {
                email: 'String3155869',
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
