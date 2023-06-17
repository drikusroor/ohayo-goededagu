import type { ComponentMeta } from '@storybook/react'

import EditAccountPage from './EditAccountPage'

export const generated = () => {
  return <EditAccountPage />
}

export default {
  title: 'Pages/EditAccountPage',
  component: EditAccountPage,
} as ComponentMeta<typeof EditAccountPage>
