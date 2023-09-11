import { render } from '@redwoodjs/testing/web'

import getArticle from 'src/fixtures/get-article.fixture'

import ArticlePhotoGallery from './ArticlePhotoGallery'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ArticlePhotoGallery', () => {
  it('renders successfully', () => {
    expect(() => {
      const article = getArticle()

      render(<ArticlePhotoGallery article={article} />)
    }).not.toThrow()
  })
})
