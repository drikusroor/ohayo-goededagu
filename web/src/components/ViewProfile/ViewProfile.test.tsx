import { render } from '@redwoodjs/testing/web'

import ViewProfile from './ViewProfile'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ViewProfile', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewProfile />)
    }).not.toThrow()
  })
})
