import { render } from '@redwoodjs/testing/web'

import UserModerationPage from './UserModerationPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UserModerationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserModerationPage />)
    }).not.toThrow()
  })
})
