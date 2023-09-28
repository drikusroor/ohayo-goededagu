// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react'

import UserSubscriptionsCommentCheckbox from './UserSubscriptionsCommentCheckbox'

const meta: Meta<typeof UserSubscriptionsCommentCheckbox> = {
  component: UserSubscriptionsCommentCheckbox,
}

export default meta

type Story = StoryObj<typeof UserSubscriptionsCommentCheckbox>

export const Primary: Story = {}
