// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Thumbs> = (args) => {
//   return <Thumbs {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Thumbs from './Thumbs'

export const generated = () => {
  return <Thumbs />
}

export default {
  title: 'Components/Thumbs',
  component: Thumbs,
} as ComponentMeta<typeof Thumbs>
