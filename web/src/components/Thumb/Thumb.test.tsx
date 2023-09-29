import { render } from '@redwoodjs/testing/web'

import Thumb from 'src/components/Thumb/Thumb'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Thumb', () => {
  it('renders successfully', () => {
    expect(() => {
      const up = true
      const count = 1
      const onClick = () => {}
      const names = ['John Doe']

      render(<Thumb names={names} up={up} count={count} onClick={onClick} />)
    }).not.toThrow()
  })
})
