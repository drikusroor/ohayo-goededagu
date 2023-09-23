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

import PostFilterMenu from './PostFilterMenu'

const meta: Meta<typeof PostFilterMenu> = {
  component: PostFilterMenu,
}

export default meta

type Story = StoryObj<typeof PostFilterMenu>

export const Primary: Story = {}
