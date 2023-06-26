import { render } from '@redwoodjs/testing/web'

import Thumbs from './Thumbs'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Thumbs', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Thumbs />)
    }).not.toThrow()
  })
})
