import { render } from '@redwoodjs/testing/web'

import PostFilterMenu from './PostFilterMenu'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('PostFilterMenu', () => {
  it('renders successfully', () => {
    const activeFilters = {
      postTypes: [],
      authors: [],
      from: null,
      to: null,
    }

    expect(() => {
      render(<PostFilterMenu activeFilters={activeFilters} />)
    }).not.toThrow()
  })
})
