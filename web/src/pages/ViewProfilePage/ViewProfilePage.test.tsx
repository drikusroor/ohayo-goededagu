import { render } from '@redwoodjs/testing/web'

import ViewProfilePage from './ViewProfilePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ViewProfilePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewProfilePage />)
    }).not.toThrow()
  })
})
