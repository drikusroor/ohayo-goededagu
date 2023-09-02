import { render } from '@redwoodjs/testing/web'

import MarkdownEditor from './MarkdownEditor'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MarkdownEditor', () => {
  it('renders successfully', () => {
    expect(() => {

      const name = 'test'
      const value = 'test'
      const onChange = () => {}
      const placeholder = 'test'
      const className = 'test'
      const validation = { required: true}

      render(<MarkdownEditor name={name} value={value} onChange={onChange} placeholder={placeholder} className={className} validation={validation} />)
    }).not.toThrow()
  })
})
