import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'

type BlogLayoutProps = {
  children?: React.ReactNode
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, logOut, currentUser } = useAuth()
  return (
    <>
      <Toaster />
      <header className="w-full pb-5 text-center">
        {isAuthenticated && currentUser && (
          <div className="flex items-center justify-between bg-slate-500 p-3 text-white">
            <span>Logged in as {currentUser.email}</span>
            <ul className="flex gap-3">
              <li>
                <Link
                  className="block rounded bg-cobalt-blue px-3 py-2 text-xs font-semibold uppercase text-white transition hover:brightness-110 hover:filter "
                  to={routes.admin()}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Button text="Logout" onClick={logOut} color="monza-red" />
              </li>
            </ul>
          </div>
        )}
        <div className="mx-auto w-32">
          <Link to={routes.home()} title="Ohayou Goededagu" aria-label="Home">
            <img
              src="/images/logo.png"
              className="mx-auto origin-top rounded-b-full shadow-lg transition duration-500 ease-in-out hover:scale-110 hover:transform hover:shadow-xl"
              alt="Logo Ohayo Goededagu"
              width={128}
              height={128}
            />
          </Link>
        </div>
        <h1 className="pt-3 text-3xl font-bold">
          Ohayou Goededagu | おはよ グデダギュ
        </h1>
        <pre className="mt-3">Japan 2023</pre>
        <nav>
          <ul className="mt-3 flex justify-center gap-5">
            <li>
              <Link className="rw-button" to={routes.home()}>
                Blog
              </Link>
            </li>
            <li>
              <Link className="rw-button" to={routes.about()}>
                Reisgenootschap
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="max-w-screen mx-auto p-4 md:max-w-7xl">{children}</main>
    </>
  )
}

export default BlogLayout
