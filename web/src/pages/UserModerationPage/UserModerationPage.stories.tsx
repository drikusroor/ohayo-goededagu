import type { ComponentMeta } from '@storybook/react'

import UserModerationPage from './UserModerationPage'

export const generated = () => {
  return <UserModerationPage />
}

export default {
  title: 'Pages/UserModerationPage',
  component: UserModerationPage,
} as ComponentMeta<typeof UserModerationPage>
