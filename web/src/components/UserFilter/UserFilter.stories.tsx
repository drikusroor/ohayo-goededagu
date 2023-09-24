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

import UserFilter from './UserFilter'

const meta: Meta<typeof UserFilter> = {
  component: UserFilter,
}

export default meta

type Story = StoryObj<typeof UserFilter>

export const Primary: Story = {}
