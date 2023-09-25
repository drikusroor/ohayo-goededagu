import { render } from '@redwoodjs/testing/web'

import ScrollToTop from './ScrollToTop'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ScrollToTop', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ScrollToTop />)
    }).not.toThrow()
  })
})
