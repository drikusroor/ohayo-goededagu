import { render } from '@redwoodjs/testing/web'

import MarkdownEditor from './MarkdownEditor'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MarkdownEditor', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MarkdownEditor />)
    }).not.toThrow()
  })
})
