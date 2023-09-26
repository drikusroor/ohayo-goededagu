import { render } from '@redwoodjs/testing/web'

import EmailSettingsPage from './EmailSettingsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EmailSettingsPage', () => {
  it('renders successfully', () => {
    mockCurrentUser({
      id: 1,
      name: 'John Doe',
      email: 'info@example.com',
      roles: ['USER'],
    })

    expect(() => {
      render(<EmailSettingsPage />)
    }).not.toThrow()
  })
})
