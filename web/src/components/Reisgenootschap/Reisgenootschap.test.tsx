import { render } from '@redwoodjs/testing/web'

import Reisgenootschap from './Reisgenootschap'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Reisgenootschap', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Reisgenootschap />)
    }).not.toThrow()
  })
})
