import { render } from '@redwoodjs/testing/web'

import PostTypeFilter from './PostTypeFilter'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PostTypeFilter', () => {
  it('renders successfully', () => {
    const activePostTypes = []

    expect(() => {
      render(<PostTypeFilter activePostTypes={activePostTypes} />)
    }).not.toThrow()
  })
})
