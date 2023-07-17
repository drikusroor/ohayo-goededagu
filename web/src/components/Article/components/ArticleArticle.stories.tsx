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

import getArticle from 'src/fixtures/get-article.fixture'
import { EPostDisplayType } from 'src/types/post-display-type.enum'

import ArticleArticle from './ArticleArticle'

export const full = () => {
  return (
    <div className="p-8">
      <ArticleArticle
        article={getArticle()}
        displayType={EPostDisplayType.FULL}
      />
    </div>
  )
}

export const preview = () => {
  return (
    <div className="p-8">
      <ArticleArticle
        article={getArticle()}
        displayType={EPostDisplayType.PREVIEW}
      />
    </div>
  )
}

export const previewNoComments = () => {
  const article = getArticle({ comments: [] })

  return (
    <div className="p-8">
      <ArticleArticle
        article={article}
        displayType={EPostDisplayType.PREVIEW}
      />
    </div>
  )
}

export default {
  title: 'Components/ArticleArticle',
  component: ArticleArticle,
} as ComponentMeta<typeof ArticleArticle>
