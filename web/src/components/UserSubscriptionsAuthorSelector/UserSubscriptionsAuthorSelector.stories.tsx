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

import UserSubscriptionsAuthorSelector from './UserSubscriptionsAuthorSelector'

const meta: Meta<typeof UserSubscriptionsAuthorSelector> = {
  component: UserSubscriptionsAuthorSelector,
}

export default meta

type Story = StoryObj<typeof UserSubscriptionsAuthorSelector>

export const Primary: Story = {}
