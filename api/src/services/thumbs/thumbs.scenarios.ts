import type { Prisma, Thumb } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.ThumbCreateArgs>({
  thumb: {
    one: {
      data: {
        up: true,
        user: {
          create: {
            email: 'String4796571',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        comment: {
          create: {
            body: 'String',
            user: {
              create: {
                email: 'String4623626',
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
                    email: 'String2063275',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },
    two: {
      data: {
        up: true,
        user: {
          create: {
            email: 'String4313646',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        comment: {
          create: {
            body: 'String',
            user: {
              create: {
                email: 'String3793891',
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
                    email: 'String6461807',
                    hashedPassword: 'String',
                    salt: 'String',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Thumb, 'thumb'>
