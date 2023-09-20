import { render, act } from '@redwoodjs/testing/web'

import Comment from './Comment'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

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
  imageGalleries: [],
  postThumbs: [],
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

describe('Comment', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Comment comment={comment} />)
    }).not.toThrow()
  })

  it('calls onClickReply when reply button is clicked', async () => {
    const onClickReply = jest.fn()

    const { getByTestId } = render(
      <Comment comment={comment} onClickReply={onClickReply} />
    )

    const replyButton = getByTestId('replyButton')

    await act(async () => {
      replyButton.click()
    })

    expect(onClickReply).toHaveBeenCalled()

    expect(onClickReply).toHaveBeenCalledWith(comment)
  })
})
