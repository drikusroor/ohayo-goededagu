import { render } from '@redwoodjs/testing/web'

import Thumbs from './Thumbs'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Thumbs', () => {
  it('renders successfully', () => {
    mockCurrentUser({
      id: 1,
      name: 'test',
      email: 'info@example.com',
      roles: ['ADMIN'],
    })

    expect(() => {
      const thumbs = [
        {
          id: 1,
          up: true,
          userId: 1,
        },
      ]

      render(<Thumbs thumbs={thumbs} />)
    }).not.toThrow()
  })
})
