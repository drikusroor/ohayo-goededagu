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

import PhotoGrid from './PhotoGrid'

const photoGallery = [
  {
    secure_url:
      'https://res.cloudinary.com/dl5elpdjy/image/upload/v1694013700/m7tz9smhnjqhc9jihxn8.jpg',
  },
  {
    secure_url:
      'https://res.cloudinary.com/dl5elpdjy/image/upload/v1694014709/gntfcglakmsgnev5ak7n.jpg',
  },
  {
    secure_url:
      'https://res.cloudinary.com/dl5elpdjy/image/upload/v1694013693/ftyhdb5tbmt2kkyqfxyf.jpg',
  },
  {
    secure_url:
      'https://res.cloudinary.com/dl5elpdjy/image/upload/v1694013774/Tokyo/dkqnbtx2uy0cielrlg4a.jpg',
  },
  {
    secure_url:
      'https://res.cloudinary.com/dl5elpdjy/image/upload/v1694013775/Tokyo/cpfxs2x0dvcps1wbvgk7.jpg',
  },
  {
    secure_url:
      'https://res.cloudinary.com/dl5elpdjy/image/upload/v1694013775/Tokyo/r47rc6ovrbutqjbkkpty.jpg',
  },
]

export const full = () => {
  return <PhotoGrid photoGallery={photoGallery} />
}

export const preview = () => {
  return <PhotoGrid preview={true} photoGallery={photoGallery} />
}

export default {
  title: 'Components/PhotoGrid',
  component: PhotoGrid,
} as ComponentMeta<typeof PhotoGrid>
