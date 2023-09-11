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

import { EPostType } from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import getArticle from 'src/fixtures/get-article.fixture'

import ArticlePreview from './ArticlePreview'

const articleArticleData = getArticle()

const articleArticleWithCoverImage = getArticle({
  coverImage: {
    url: 'https://cataas.com/cat',
  },
})

const articleVideoData = getArticle({
  videoPost: {
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  type: EPostType.VIDEO,
})

const articleVideoWithCoverImage = getArticle({
  ...articleVideoData,
  coverImage: {
    url: 'https://cataas.com/cat',
  },
})

const articleChottoData = getArticle({
  type: EPostType.CHOTTO,
})

const articleChottoWithCoverImage = getArticle({
  type: EPostType.CHOTTO,
  coverImage: {
    url: 'https://cataas.com/cat',
  },
})

const articleHaikuData = getArticle({
  type: EPostType.HAIKU,
  body: 'This is a haiku \n\n It has three lines of text \n\n And seventeen syllables',
})

const articleHaikuWithCoverImage = getArticle({
  type: EPostType.HAIKU,
  body: 'This is a haiku \n\n It has three lines of text \n\n And seventeen syllables',
  coverImage: {
    url: 'https://cataas.com/cat',
  },
})

export const articleArticlePreview = () => {
  return (
    <div className="p-8">
      <ArticlePreview article={articleArticleData} />
    </div>
  )
}

export const articleArticlePreviewWithCoverImage = () => {
  return (
    <div className="p-8">
      <ArticlePreview article={articleArticleWithCoverImage} />
    </div>
  )
}

export const articleVideoPreview = () => {
  return (
    <div className="p-8">
      <ArticlePreview article={articleVideoData} />
    </div>
  )
}

export const articleVideoPreviewWithCoverImage = () => {
  return (
    <div className="p-8">
      <ArticlePreview article={articleVideoWithCoverImage} />
    </div>
  )
}

export const articleChottoPreview = () => {
  return (
    <div className="p-8">
      <ArticlePreview article={articleChottoData} />
    </div>
  )
}

export const articleChottoPreviewWithCoverImage = () => {
  return (
    <div className="p-8">
      <ArticlePreview article={articleChottoWithCoverImage} />
    </div>
  )
}

export const articleHaikuPreview = () => {
  return (
    <div className="p-8">
      <ArticlePreview article={articleHaikuData} />
    </div>
  )
}

export const articleHaikuPreviewWithCoverImage = () => {
  return (
    <div className="p-8">
      <ArticlePreview article={articleHaikuWithCoverImage} />
    </div>
  )
}

export default {
  title: 'Articles/ArticlePreview',
  component: ArticlePreview,
} as ComponentMeta<typeof ArticlePreview>
