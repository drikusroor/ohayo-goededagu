import { render } from '@redwoodjs/testing/web'

import UserSubscriptionsCommentCheckbox from './UserSubscriptionsCommentCheckbox'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserSubscriptionsCommentCheckbox', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserSubscriptionsCommentCheckbox />)
    }).not.toThrow()
  })
})
