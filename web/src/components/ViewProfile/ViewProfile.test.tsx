import { render } from '@redwoodjs/testing/web'

import { UserFixture } from 'src/fixtures/get-user.fixture'

import ViewProfile from './ViewProfile'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ViewProfile', () => {
  it('renders successfully', () => {
    const user = new UserFixture().withFullMonty().build()

    expect(() => {
      render(<ViewProfile user={user} />)
    }).not.toThrow()
  })
})
