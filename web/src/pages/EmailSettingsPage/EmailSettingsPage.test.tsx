import { render } from '@redwoodjs/testing/web'

import EmailSettingsPage from './EmailSettingsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EmailSettingsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EmailSettingsPage />)
    }).not.toThrow()
  })
})
