import { render } from '@redwoodjs/testing/web'

import EditAccountPage from './EditAccountPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditAccountPage', () => {
  it('renders successfully', () => {
    expect(() => {
      mockCurrentUser({
        id: 1,
        name: 'test',
        email: 'info@exapmle.com',
        roles: ['ADMIN'],
      })

      render(<EditAccountPage />)
    }).not.toThrow()
  })
})
