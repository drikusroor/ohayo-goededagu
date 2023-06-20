import { render } from '@redwoodjs/testing/web'

import EditAccountForm from './EditAccountForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditAccountForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditAccountForm />)
    }).not.toThrow()
  })
})
