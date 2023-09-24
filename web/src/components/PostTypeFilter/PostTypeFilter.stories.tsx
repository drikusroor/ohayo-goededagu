// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import PostTypeFilter from './PostTypeFilter'

const meta: Meta<typeof PostTypeFilter> = {
  component: PostTypeFilter,
}

export default meta

type Story = StoryObj<typeof PostTypeFilter>

export const Primary: Story = {}
