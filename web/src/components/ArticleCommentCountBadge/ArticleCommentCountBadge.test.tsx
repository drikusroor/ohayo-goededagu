import { render } from '@redwoodjs/testing/web'

import ArticleCommentCountBadge from './ArticleCommentCountBadge'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ArticleCommentCountBadge', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ArticleCommentCountBadge />)
    }).not.toThrow()
  })
})
