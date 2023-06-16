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
          <div className="flex items-center justify-between bg-slate-500 p-3 text-white">
            <span>Logged in as {currentUser.email}</span>
            <ul className="flex items-center gap-3">
              <li>
                <Link className="rw-button rw-button-blue" to={routes.admin()}>
                  Dashboard
                </Link>
              </li>
              <li>
                <button className="rw-button rw-button-red" onClick={logOut}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
        <h1 className="pt-3 text-3xl font-bold">
          Ohayou Goededagu | おはよ グデダギュ
        </h1>
        <pre className="mt-3">
          Japan 2023
        </pre>
        <nav>
          <ul className="mt-3 flex justify-center gap-5">
            <li>
              <Link className="rw-button" to={routes.home()}>
                Blog
              </Link>
            </li>
            <li>
              <Link className="rw-button" to={routes.about()}>
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
