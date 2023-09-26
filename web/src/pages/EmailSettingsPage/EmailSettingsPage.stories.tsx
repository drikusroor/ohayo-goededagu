import type { Meta, StoryObj } from '@storybook/react'

import EmailSettingsPage from './EmailSettingsPage'

const meta: Meta<typeof EmailSettingsPage> = {
  component: EmailSettingsPage,
}

export default meta

type Story = StoryObj<typeof EmailSettingsPage>

export const Primary: Story = {}
