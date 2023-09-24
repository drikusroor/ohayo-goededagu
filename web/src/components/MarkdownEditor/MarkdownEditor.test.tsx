import { Form } from '@redwoodjs/forms'
import { render } from '@redwoodjs/testing/web'

import MarkdownEditor from './MarkdownEditor'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MarkdownEditor', () => {
  it('renders successfully', () => {
    expect(() => {
      const name = 'test'
      const value = 'test'
      const setValue = jest.fn()
      const placeholder = 'test'
      const className = 'test'
      const validation = { required: true }
      render(
        <Form>
          <MarkdownEditor
            name={name}
            value={value}
            onChange={setValue}
            placeholder={placeholder}
            className={className}
            validation={validation}
          />
        </Form>
      )
    }).not.toThrow()
  })
})
