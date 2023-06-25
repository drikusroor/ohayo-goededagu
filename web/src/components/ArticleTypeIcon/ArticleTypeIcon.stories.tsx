// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ArticleTypeIcon> = (args) => {
//   return <ArticleTypeIcon {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ArticleTypeIcon from './ArticleTypeIcon'

export const generated = () => {
  return <ArticleTypeIcon />
}

export default {
  title: 'Components/ArticleTypeIcon',
  component: ArticleTypeIcon,
} as ComponentMeta<typeof ArticleTypeIcon>
