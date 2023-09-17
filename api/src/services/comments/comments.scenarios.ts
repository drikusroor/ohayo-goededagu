import type { Prisma, Comment } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      data: {
        body: 'String',
        user: {
          create: {
            email: 'info@example.com',
            hashedPassword: 'uiowfojweofjoiwjef',
            salt: 'wpijefoiwjeoifjwe',
          },
        },
        post: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'knalvis@example.com',
                hashedPassword: 'woiefjoiwjeoifj',
                salt: 'wpioefjoiwjef',
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
            email: 'zopie@exapmle.com',
            hashedPassword: 'wpoiejfoijweif',
            salt: 'pwoief0jweoif',
          },
        },
        post: {
          create: {
            title: 'String',
            user: {
              create: {
                email: 'zpdos@exapmle.com',
                hashedPassword: 'poiwejfiojwef',
                salt: 'woiefjowjef',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Comment, 'comment'>
