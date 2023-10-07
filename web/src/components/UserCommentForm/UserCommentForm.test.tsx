import { render } from '@redwoodjs/testing/web'

import UserCommentForm from './UserCommentForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CommentForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserCommentForm postId={1} />)
    }).not.toThrow()
  })
})
