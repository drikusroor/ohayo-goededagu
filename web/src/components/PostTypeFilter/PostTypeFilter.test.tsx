import { render } from '@redwoodjs/testing/web'

import PostTypeFilter from './PostTypeFilter'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PostTypeFilter', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PostTypeFilter />)
    }).not.toThrow()
  })
})
