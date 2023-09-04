import { render } from '@redwoodjs/testing/web'

import Comment from './Comment'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Comment', () => {
  it('renders successfully', () => {
    expect(() => {
      const user = {
        id: 1,
        name: 'test',
        email: 'info@example.com',
        posts: [],
        roles: [],
      }

      const post = {
        id: 1,
        title: 'test',
        body: 'test',
        createdAt: '2021-02-22T20:02:20.000Z',
        comments: [],
        published: true,
        type: 'ARTICLE',
        updatedAt: '2021-02-22T20:02:20.000Z',
        user,
      }

      const comment = {
        id: 1,
        body: 'test',
        createdAt: '2021-02-22T20:02:20.000Z',
        thumbs: [],
        deleted: false,
        postId: 1,
        post,
        userId: 1,
        user,
        children: [
          {
            id: 2,
            body: 'ik ben een kindje',
            createdAt: '2021-02-22T20:02:20.000Z',
            thumbs: [],
            deleted: false,
            postId: 1,
            post,
            userId: 1,
            user,
            children: [],
          },
        ],
      }

      render(<Comment comment={comment} />)
    }).not.toThrow()
  })
})
