import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      <header className="w-full pb-5 pt-3 text-center">
        <h1 className="text-2xl">Ohayou Goededagu</h1>
        <pre>Collectieve reisblog voor de reis van 2023 naar Japan.</pre>

        {isAuthenticated ? (
          <div>
            <span>Logged in as {currentUser.email}</span>{' '}
            <button type="button" onClick={logOut}>
              Logout
            </button>
          </div>
        ) : (
          <Link to={routes.login()}>Login</Link>
        )}
      </header>
      <main className="mx-auto max-w-xl">{children}</main>
    </>
  )
}

export default BlogLayout
