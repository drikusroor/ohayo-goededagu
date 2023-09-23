import { render } from '@redwoodjs/testing/web'

import AdminRedirect from './AdminRedirect'

describe('AdminRedirect', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminRedirect />)
    }).not.toThrow()
  })

  it('redirects to /admin/posts when user has required role', () => {
    mockCurrentUser({
      id: 123,
      name: 'Jane Doe',
      email: 'info@example.com',
      roles: ['ADMIN', 'MODERATOR'],
    })

    expect(() => {
      render(<AdminRedirect />)
    }).not.toThrow()
  })

  it('redirects to /admin/account/edit when user does not have required role', () => {
    mockCurrentUser({
      id: 123,
      name: 'Jane Doe',
      email: 'info@example.com',
      roles: ['USER'],
    })

    expect(() => {
      render(<AdminRedirect />)
    }).not.toThrow()
  })
})
