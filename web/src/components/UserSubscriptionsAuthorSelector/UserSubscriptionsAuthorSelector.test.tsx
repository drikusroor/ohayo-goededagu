import { render } from '@redwoodjs/testing/web'

import UserSubscriptionsAuthorSelector from './UserSubscriptionsAuthorSelector'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserSubscriptionsAuthorSelector', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserSubscriptionsAuthorSelector />)
    }).not.toThrow()
  })
})
