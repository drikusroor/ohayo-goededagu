// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof CommentForm> = (args) => {
//   return <CommentForm {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import CommentForm from './CommentForm'

export const generated = () => {
  return <CommentForm />
}

export default {
  title: 'Components/CommentForm',
  component: CommentForm,
} as ComponentMeta<typeof CommentForm>
