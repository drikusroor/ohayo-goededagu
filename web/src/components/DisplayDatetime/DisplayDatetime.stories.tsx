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

import DisplayDatetime from './DisplayDatetime'

const meta: Meta<typeof DisplayDatetime> = {
  component: DisplayDatetime,
}

export default meta

type Story = StoryObj<typeof DisplayDatetime>

export const Primary: Story = {}
