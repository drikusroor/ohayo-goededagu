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

import UploadList from './UploadList'

const meta: Meta<typeof UploadList> = {
  component: UploadList,
}

export default meta

type Story = StoryObj<typeof UploadList>

export const Primary: Story = {}
