import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser } = useAuth()
  return (
    <>
      <header className="w-full pb-5 text-center">
        {isAuthenticated && (
          <div className="flex items-center justify-between bg-red-500 p-3 text-white">
            <span>Logged in as {currentUser.email}</span>
            <ul>
              <li>
                <Link
                  className="rounded bg-gray-900 px-4 py-2 font-bold text-white hover:bg-gray-700"
                  to={routes.admin()}
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        )}
        <h1 className="pt-3 text-3xl font-bold">Ohayou Goededagu</h1>
        <pre className="mt-3">
          Collectieve reisblog voor de reis van 2023 naar Japan.
        </pre>
        <nav>
          <ul className="mt-3 flex justify-center gap-5">
            <li>
              <Link
                className="text-blue-500 hover:underline"
                to={routes.home()}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                className="text-blue-500 hover:underline"
                to={routes.about()}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-xl">{children}</main>
    </>
  )
}

export default BlogLayout
