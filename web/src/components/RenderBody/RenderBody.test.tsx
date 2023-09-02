import { render } from '@redwoodjs/testing/web'

import RenderBody from './RenderBody'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RenderBody', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RenderBody />)
    }).not.toThrow()
  })
})
