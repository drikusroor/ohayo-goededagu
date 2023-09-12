import { render } from '@redwoodjs/testing/web'

import UpdatePasswordForm from './UpdatePasswordForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UpdatePasswordForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UpdatePasswordForm />)
    }).not.toThrow()
  })
})
