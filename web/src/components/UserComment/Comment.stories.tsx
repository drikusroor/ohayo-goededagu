// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Comment> = (args) => {
//   return <Comment {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Comment from './Comment'

export const generated = () => {
  mockCurrentUser({
    id: 1,
    email: 'info@example.com',
  })

  const comment = {
    id: 1,
    createdAt: '2021-07-01T00:00:00Z',
    user: {
      id: 1,
      email: 'info@example.com',
      profile: {
        id: 1,
        name: 'User Name',
        avatar:
          'https://ui-avatars.com/api/?name=User+Name&color=7F9CF5&background=EBF4FF',
        bio: 'User bio',
      },
    },
    thumbs: [
      {
        id: 1,
        userId: 1,
        up: true,
        user: {
          email: 'info@example.com',
          profile: {
            id: 1,
            name: 'User Name',
            avatar:
              'https://ui-avatars.com/api/?name=User+Name&color=7F9CF5&background=EBF4FF',
            bio: 'User bio',
          },
        },
      },
    ],
  }

  return <Comment comment={comment} onClickReply={{ id: 2 }} />
}

export default {
  title: 'Components/Comment',
  component: Comment,
} as ComponentMeta<typeof Comment>
