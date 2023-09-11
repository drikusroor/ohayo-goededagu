import type { ComponentMeta, ComponentStory } from '@storybook/react'

import BlogLayout from './BlogLayout'

export const generated: ComponentStory<typeof BlogLayout> = (args) => {
  return <BlogLayout {...args} />
}

export const loading: ComponentStory<typeof BlogLayout> = (args) => {
  return <BlogLayout {...args} skeleton />
}

export default {
  title: 'Layouts/BlogLayout',
  component: BlogLayout,
} as ComponentMeta<typeof BlogLayout>
