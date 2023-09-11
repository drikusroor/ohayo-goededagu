import { render } from '@redwoodjs/testing/web'

import UploadList from './UploadList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UploadList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UploadList />)
    }).not.toThrow()
  })
})
