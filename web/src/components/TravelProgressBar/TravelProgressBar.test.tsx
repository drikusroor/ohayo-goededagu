import { render } from '@redwoodjs/testing/web'

import TravelProgressBar from './TravelProgressBar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TravelProgressBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TravelProgressBar />)
    }).not.toThrow()
  })
})
