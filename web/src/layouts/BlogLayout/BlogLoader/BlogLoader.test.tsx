import { render } from '@redwoodjs/testing/web'

import BlogLoader from './BlogLoader'

describe('BlogLoader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BlogLoader />)
    }).not.toThrow()
  })
})
