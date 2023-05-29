import type { ComponentMeta, ComponentStory } from '@storybook/react'

import AdminDashboardLayout from './AdminDashboardLayout'

export const generated: ComponentStory<typeof AdminDashboardLayout> = (
  args
) => {
  return <AdminDashboardLayout {...args} />
}

export default {
  title: 'Layouts/AdminDashboardLayout',
  component: AdminDashboardLayout,
} as ComponentMeta<typeof AdminDashboardLayout>
