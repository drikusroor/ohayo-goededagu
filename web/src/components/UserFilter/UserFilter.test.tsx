import { render } from '@redwoodjs/testing/web'

import UserFilter from './UserFilter'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserFilter', () => {
  it('renders successfully', () => {
    const activeAuthors = [1, 2, 3]

    const usersWithPosts = [
      {
        id: 1,
        profile: {
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/100?u=john-doe',
        },
      },
    ]

    expect(() => {
      render(
        <UserFilter
          activeAuthors={activeAuthors}
          usersWithPosts={usersWithPosts}
        />
      )
    }).not.toThrow()
  })
})
