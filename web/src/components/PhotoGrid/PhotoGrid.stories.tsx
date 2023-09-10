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

import PhotoGrid from './PhotoGrid'

const article = getArticle()

export const full = () => {
  return <PhotoGrid images={article.imageGalleries?.imageGallery?.images} />
}

export const preview = () => {
  return (
    <PhotoGrid
      preview={true}
      images={article.imageGalleries?.imageGallery?.images}
    />
  )
}

export default {
  title: 'Components/PhotoGrid',
  component: PhotoGrid,
} as ComponentMeta<typeof PhotoGrid>
