// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Thumb> = (args) => {
//   return <Thumb {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Thumb from './Thumb'

export const generated = () => {
  return <Thumb />
}

export default {
  title: 'Components/Thumb',
  component: Thumb,
} as ComponentMeta<typeof Thumb>
