// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Reisgenootschap> = (args) => {
//   return <Reisgenootschap {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import Reisgenootschap from './Reisgenootschap'

export const generated = () => {
  return <Reisgenootschap />
}

export default {
  title: 'Components/Reisgenootschap',
  component: Reisgenootschap,
} as ComponentMeta<typeof Reisgenootschap>
