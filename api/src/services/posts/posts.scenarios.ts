import type { Prisma, Post } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: {
      data: {
        title: 'String',
        body: 'String',
        published: true,
        user: {
          create: {
            id: 123,
            hashedPassword: 'String',
            salt: 'String',
            email: 'info@example.com',
            name: 'George Ringo',
            roles: ['ADMIN', 'MODERATOR', 'USER', 'GUEST'],
          },
        },
      },
    },
    two: {
      data: {
        title: 'String',
        body: 'String',
        published: true,
        user: {
          create: {
            id: 124,
            hashedPassword: 'String',
            salt: 'String',
            email: 'lollerblade@example.com',
            name: 'George Ringo',
            roles: ['ADMIN', 'MODERATOR', 'USER', 'GUEST'],
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Post, 'post'>
