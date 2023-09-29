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

import LanguageButton from './LanguageButton'

const meta: Meta<typeof LanguageButton> = {
  component: LanguageButton,
}

export default meta

type Story = StoryObj<typeof LanguageButton>

export const Primary: Story = {}
