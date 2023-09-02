import { render } from '@redwoodjs/testing/web'

import getArticle from 'src/fixtures/get-article.fixture'

import Article from './Article'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Article', () => {
  it('renders successfully', () => {
    expect(() => {
      const article = getArticle()

      render(<Article article={article} />)
    }).not.toThrow()
  })
})
