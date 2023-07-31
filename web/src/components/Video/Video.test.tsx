import { render } from '@redwoodjs/testing/web'

import Video from './Video'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Video', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Video />)
    }).not.toThrow()
  })
})
