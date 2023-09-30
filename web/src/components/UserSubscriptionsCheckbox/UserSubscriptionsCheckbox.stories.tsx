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

import UserSubscriptionsCheckbox from './UserSubscriptionsCheckbox'

const meta: Meta<typeof UserSubscriptionsCheckbox> = {
  component: UserSubscriptionsCheckbox,
}

export default meta

type Story = StoryObj<typeof UserSubscriptionsCheckbox>

export const Primary: Story = {}
