import { render } from '@redwoodjs/testing/web'

import UserFilter from './UserFilter'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserFilter', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserFilter />)
    }).not.toThrow()
  })
})
