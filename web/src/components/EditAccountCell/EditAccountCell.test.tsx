import { render } from '@redwoodjs/testing/web'

import { Loading, Empty, Failure, Success } from './EditAccountCell'
import { standard } from './EditAccountCell.mock'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//        https://redwoodjs.com/docs/testing#testing-cells
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

window.cloudinary = {
  createUploadWidget: jest.fn(),
  openMediaLibrary: jest.fn(),
}

describe('EditAccountCell', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', async () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', async () => {
    expect(() => {
      render(<Failure error={new Error('Oh no')} />)
    }).not.toThrow()
  })

  it('renders Success successfully', async () => {
    expect(() => {
      render(<Success user={standard().editAccount} />)
    }).not.toThrow()
  })
})
