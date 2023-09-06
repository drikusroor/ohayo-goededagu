// When you've added props to your component,
// pass Storybook's `args` through this story to control it from the addons panel:
//
// ```tsx
// import type { ComponentStory } from '@storybook/react'
//
// export const generated: ComponentStory<typeof Article> = (args) => {
//   return <Article {...args} />
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { ComponentMeta } from '@storybook/react'

import getArticle from 'src/fixtures/get-article.fixture'

import { EPostType } from '../ArticleTypeIcon/ArticleTypeIcon'

import Article from './Article'

const articleArticleData = getArticle()

const articleVideoData = getArticle({
  videoPost: {
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  type: EPostType.VIDEO,
})

const articleChottoData = getArticle({
  type: EPostType.CHOTTO,
})

const articleHaikuData = getArticle({
  type: EPostType.HAIKU,
  body: 'This is a haiku \n\n It has three lines of text \n\n And seventeen syllables',
})

export const articleArticle = () => {
  return <Article article={articleArticleData} />
}

export const articleVideo = () => {
  return <Article article={articleVideoData} />
}

export const articleChotto = () => {
  return <Article article={articleChottoData} />
}

export const articleHaiku = () => {
  return <Article article={articleHaikuData} />
}

export default {
  title: 'Articles/Article',
  component: Article,
} as ComponentMeta<typeof Article>
