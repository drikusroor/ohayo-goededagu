// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof ArticleCommentCountBadge> = (args) => {
//   return <ArticleCommentCountBadge {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import ArticleCommentCountBadge from './ArticleCommentCountBadge'

export const generated = () => {
  return (
    <div className="bg-slate-700 p-8">
      <ArticleCommentCountBadge count={5} />
    </div>
  )
}

export default {
  title: 'Components/ArticleCommentCountBadge',
  component: ArticleCommentCountBadge,
} as ComponentMeta<typeof ArticleCommentCountBadge>
