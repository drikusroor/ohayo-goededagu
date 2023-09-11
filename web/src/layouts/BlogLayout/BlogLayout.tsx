import { BsBoxArrowUp, BsPersonCircle, BsTools } from 'react-icons/bs'

import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import Skeleton from 'src/components/Skeleton/Skeleton'

type BlogLayoutProps = {
  children?: React.ReactNode
  skeleton?: boolean
}

const BlogLayout = ({ children, skeleton }: BlogLayoutProps) => {
  const { isAuthenticated, logOut, currentUser } = useAuth()

  if (skeleton) {
    return (
      <>
        <header className="w-full pb-5 text-center">
          <div className={`mx-auto w-32`}>
            <Skeleton
              circle={true}
              height={128}
              width={128}
              className="rounded-t-sm shadow-lg"
            />
          </div>
          <h1 className="flex h-12 justify-center gap-2 pt-3 text-3xl font-bold">
            <Skeleton width={300} className="rounded" />
            <Skeleton width={300} className="rounded" />
          </h1>
          <Skeleton width={100} className="mx-auto mt-2 rounded" />
          <nav>
            <ul className="mt-3 flex justify-center gap-5">
              <li>
                <Skeleton width={50} className="rounded" />
              </li>
              <li>
                <Skeleton width={50} className="rounded" />
              </li>
              <li>
                <Skeleton width={150} className="rounded" />
              </li>
            </ul>
          </nav>
        </header>
        <main className="max-w-screen mx-auto flex flex-col gap-8 p-4 md:max-w-7xl">
          <Skeleton className="h-96 w-full rounded" />
          <Skeleton className="h-96 w-full rounded" />
          <Skeleton className="h-96 w-full rounded" />
        </main>
      </>
    )
  }

  return (
    <>
      <Toaster />
      <header className="w-full pb-5 text-center">
        {isAuthenticated && currentUser && (
          <div className="fixed top-0 z-10 flex w-full items-center justify-between bg-slate-900 p-3 text-white">
            <div className="flex items-center gap-2">
              <Link
                className="flex items-center gap-2 rounded bg-cobalt-blue-600 px-4 py-3 font-semibold uppercase text-white transition hover:bg-cobalt-blue-500 hover:filter sm:text-xs"
                to={routes.admin()}
              >
                <BsTools />
                <span className="hidden sm:block">Dashboard</span>
              </Link>
            </div>
            <ul className="flex gap-3">
              <li>
                <Link
                  to={routes.account()}
                  className="flex items-center gap-2 rounded bg-yellow-600 px-4 py-3 font-semibold uppercase text-white transition hover:bg-yellow-500 hover:filter sm:text-xs"
                  title={currentUser.email}
                >
                  <BsPersonCircle />
                  <span className="hidden sm:inline-block">Account</span>
                </Link>
              </li>
              <li>
                <Button
                  onClick={logOut}
                  color="monza-red"
                  className="flex items-center gap-2 px-4 py-3 sm:text-xs "
                >
                  <BsBoxArrowUp />
                  <span className="hidden sm:block ">Uitloggen</span>
                </Button>
              </li>
            </ul>
          </div>
        )}
        <div className={`mx-auto w-32 ${isAuthenticated && 'mt-16'}`}>
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
          <span className="whitespace-nowrap">Ohayou&nbsp;Goededagu</span> |{' '}
          <span className="whitespace-nowrap">おはよ&nbsp;グデダギュ</span>
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
              <Link className="rw-button" to={routes.vlog()}>
                Vlog
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
      <main className="mx-auto grid max-w-6xl">{children}</main>
    </>
  )
}

export default BlogLayout
