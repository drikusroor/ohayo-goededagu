import { render } from '@redwoodjs/testing/web'

import UserSubscriptionsCheckbox from './UserSubscriptionsCheckbox'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserSubscriptionsCheckbox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserSubscriptionsCheckbox />)
    }).not.toThrow()
  })
})
