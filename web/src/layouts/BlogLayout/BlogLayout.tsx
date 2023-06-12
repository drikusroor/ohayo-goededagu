import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, logOut, currentUser } = useAuth()
  return (
    <>
      <header className="w-full pb-5 text-center">
        {isAuthenticated && currentUser && (
          <div className="flex items-center justify-between bg-red-500 p-3 text-white">
            <span>Logged in as {currentUser.email}</span>
            <ul className="flex items-center gap-3">
              <li>
                <Link
                  className="block rounded bg-blue-900 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-800"
                  to={routes.admin()}
                >
                  Admin
                </Link>
              </li>
              <li>
                <button
                  className="rounded bg-red-900 px-4 py-2 font-bold text-white transition-colors hover:bg-red-800"
                  onClick={logOut}
                >
                  Logout
                </button>
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
