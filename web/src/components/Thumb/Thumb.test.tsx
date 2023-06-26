import { render } from '@redwoodjs/testing/web'

import Thumb from './Thumb'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Thumb', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Thumb />)
    }).not.toThrow()
  })
})
