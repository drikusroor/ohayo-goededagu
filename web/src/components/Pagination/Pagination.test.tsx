import { render, screen } from '@redwoodjs/testing/web'

import Pagination from './Pagination'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Pagination', () => {
  it('renders successfully', () => {
    const pagination = {
      count: 1,
      page: 1,
      perPage: 1,
    }

    expect(() => {
      render(<Pagination pagination={pagination} />)
    }).not.toThrow()
  })

  it('links to the correct page based on the routeName prop', () => {
    const pagination = {
      count: 100,
      page: 3,
      perPage: 10,
    }

    expect(() => {
      render(<Pagination pagination={pagination} routeName="vlog" />)
    }).not.toThrow()

    const link = screen.getByRole('link', { name: '1' })
    expect(link).toHaveAttribute('href', '/vlog?page=1')
  })
})
