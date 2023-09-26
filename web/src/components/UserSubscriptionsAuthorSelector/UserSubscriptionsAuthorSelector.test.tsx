import { render } from '@redwoodjs/testing/web'

import UserSubscriptionsAuthorSelector from './UserSubscriptionsAuthorSelector'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserSubscriptionsAuthorSelector', () => {
  it('renders successfully', () => {
    const users = [
      {
        id: 123,
        email: 'info@example.com',
        profile: {
          name: 'John Doe',
          avatar: 'https://example.com/avatar.jpg',
          userId: 123,
          bio: 'Lorem ipsum dolor sit amet',
          japaneseName: 'ジョン・ドゥ',
        },
        posts: [],
        roles: ['USER'],
        userSubscriptions: [],
      },
    ]

    const selected = [123]

    const onSelect = jest.fn()

    expect(() => {
      render(
        <UserSubscriptionsAuthorSelector
          users={users}
          selected={selected}
          onSelect={onSelect}
        />
      )
    }).not.toThrow()
  })

  it('calls the onSelect function when a user is clicked', () => {
    const users = [
      {
        id: 123,
        email: 'info@example.com',
        profile: {
          name: 'John Doe',
          avatar: 'https://example.com/avatar.jpg',
          userId: 123,
          bio: 'Lorem ipsum dolor sit amet',
          japaneseName: 'ジョン・ドゥ',
        },
        posts: [],
        roles: ['USER'],
        userSubscriptions: [],
      },

      {
        id: 456,
        email: 'info@example.com',
        profile: {
          name: 'Jane Doe',
          avatar: 'https://example.com/avatar.jpg',
          userId: 456,
          bio: 'Lorem ipsum dolor sit amet',
          japaneseName: 'ジェーン・ドゥ',
        },
        posts: [],
        roles: ['USER'],
        userSubscriptions: [],
      },
    ]

    const selected = []

    const onSelect = jest.fn()

    const { getByTestId } = render(
      <UserSubscriptionsAuthorSelector
        users={users}
        selected={selected}
        onSelect={onSelect}
      />
    )

    const button = getByTestId('unselected-user-subscription-author')

    button.click()

    expect(onSelect).toHaveBeenCalledWith(456)

    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})
