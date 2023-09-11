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

import ArticleVideo from './ArticleVideo'

const articleVideoData = getArticle({
  videoPost: {
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
})

export const full = () => {
  return (
    <div className="p-8">
      <ArticleVideo
        article={articleVideoData}
        displayType={EPostDisplayType.FULL}
      />
    </div>
  )
}

export const preview = () => {
  return (
    <div className="p-8">
      <ArticleVideo
        article={articleVideoData}
        displayType={EPostDisplayType.PREVIEW}
      />
    </div>
  )
}

export const previewNoComments = () => {
  return (
    <div className="p-8">
      <ArticleVideo
        article={articleVideoData}
        displayType={EPostDisplayType.PREVIEW}
      />
    </div>
  )
}

export default {
  title: 'Articles/ArticleVideo',
  component: ArticleVideo,
} as ComponentMeta<typeof ArticleVideo>
