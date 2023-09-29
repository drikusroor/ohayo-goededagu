import { render } from '@redwoodjs/testing/web'

import LanguageButton from './LanguageButton'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LanguageButton', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LanguageButton />)
    }).not.toThrow()
  })
})
