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

import LocationPin from './LocationPin'

const meta: Meta<typeof LocationPin> = {
  component: LocationPin,
}

export default meta

type Story = StoryObj<typeof LocationPin>

export const Primary: Story = {}
