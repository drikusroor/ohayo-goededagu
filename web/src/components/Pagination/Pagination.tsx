import { NavLink, routes, useParams } from '@redwoodjs/router'

interface PaginationProps {
  // type is the name of the object returned from a key from AvailableRoutes
  routeName?: string
  pagination: Pagination
}

const Pagination = ({ pagination, routeName = 'home' }: PaginationProps) => {
  const { count, perPage } = pagination
  const currentParams = useParams()

  const pages = Math.ceil(count / perPage)

  const pageNumbers = []

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i)
  }

  const getParams = (page: number) => {
    return {
      ...currentParams,
      page,
    }
  }

  const pageNumbersJSX = pageNumbers.map((number) => {
    const isCurrentPage = pagination.page === number

    return (
      <li key={number}>
        {isCurrentPage ? (
          <span className="inline-flex h-12 w-12 select-none justify-center rounded-full border-2 border-cobalt-blue-500 bg-cobalt-blue-500 px-3 py-2 text-center text-white">
            {number}
          </span>
        ) : (
          <NavLink
            className="inline-flex h-12 w-12 justify-center rounded-full border-2 border-cobalt-blue-500 bg-white px-3 py-2 text-center text-cobalt-blue-500 hover:bg-cobalt-blue-500 hover:text-white"
            activeClassName="!bg-cobalt-blue-500 text-white"
            aria-current={isCurrentPage ? 'page' : undefined}
            to={routes[routeName](getParams(number))}
          >
            {number}
          </NavLink>
        )}
      </li>
    )
  })

  return (
    <div className="flex justify-center">
      <ul className="flex space-x-2">{pageNumbersJSX}</ul>
    </div>
  )
}

export default Pagination
