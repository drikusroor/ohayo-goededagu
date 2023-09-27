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

import { WorldClockPure } from './WorldClock'

const meta: Meta<typeof WorldClockPure> = {
  component: WorldClockPure,
}

export default meta

type Story = StoryObj<typeof WorldClockPure>

export const Primary: Story = {
  args: {
    today: new Date(),
  },
}
