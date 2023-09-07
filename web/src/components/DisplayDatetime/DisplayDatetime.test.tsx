import { render } from '@redwoodjs/testing/web'

import DisplayDatetime from './DisplayDatetime'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DisplayDatetime', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DisplayDatetime />)
    }).not.toThrow()
  })
})
