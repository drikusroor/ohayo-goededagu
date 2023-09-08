import { render } from '@redwoodjs/testing/web'

import LocationPin from './LocationPin'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LocationPin', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LocationPin />)
    }).not.toThrow()
  })
})
