import { render } from '@redwoodjs/testing/web'

import WorldClock from './WorldClock'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('WorldClock', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WorldClock />)
    }).not.toThrow()
  })
})
