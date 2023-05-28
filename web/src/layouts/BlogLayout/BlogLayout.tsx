import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <>
      {isAuthenticated ? (
        <div className="bg-slate-500 text-white p-3 flex justify-between items-center">
          <span>Logged in as {currentUser.email.split('@')[0]}</span>
          <button type="button" onClick={logOut} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Logout
          </button>
        </div>
      ) : (
        <Link to={routes.login()}>Login</Link>
      )}

      <header className="w-full pb-5 pt-3 text-center">
        <h1 className="text-2xl">Ohayou Goededagu</h1>
        <pre>Collectieve reisblog voor de reis van 2023 naar Japan.</pre>
      </header>
      <main className="mx-auto max-w-xl">{children}</main>
    </>
  )
}

export default BlogLayout
