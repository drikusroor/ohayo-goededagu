import { useEffect } from 'react'

import { BsBoxArrowUp, BsHouse, BsPersonCircle, BsTools } from 'react-icons/bs'

import { Link, navigate, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import ScrollToTop from 'src/components/ScrollToTop/ScrollToTop'
import Skeleton from 'src/components/Skeleton/Skeleton'
import WorldClock from 'src/components/WorldClock/WorldClock'

type BlogLayoutProps = {
  children?: React.ReactNode
  skeleton?: boolean
}

const BlogLayout = ({ children, skeleton }: BlogLayoutProps) => {
  const { isAuthenticated, logOut, currentUser } = useAuth()

  useEffect(() => {
    // apply .blog-layout class to body
    document.body.classList.add('blog-layout')

    // cleanup
    return () => {
      document.body.classList.remove('blog-layout')
    }
  }, [])

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
            <ul className="mt-3 flex justify-center gap-2">
              <li>
                <Skeleton width={50} className="rounded" />
              </li>
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
    <div className="flex min-h-screen flex-col">
      <Toaster />
      <ScrollToTop />
      <header className="w-full pb-5 text-center">
        {isAuthenticated && currentUser && (
          <div className="fixed top-0 z-20 flex w-full items-center justify-between bg-slate-900 p-3 text-white">
            <div className="flex items-center gap-2">
              <Button
                text="Home"
                icon={<BsHouse />}
                className="bg-green-800"
                onClick={() => navigate(routes.home())}
              />
              <Button
                text="Dashboard"
                icon={<BsTools />}
                color="cobalt-blue"
                onClick={() => navigate(routes.admin())}
              />
            </div>

            <WorldClock />

            <ul className="flex gap-3">
              <li>
                <Button
                  text="Account"
                  icon={<BsPersonCircle />}
                  title={currentUser.email}
                  className="bg-yellow-600"
                  onClick={() => navigate(routes.editAccount())}
                />
              </li>
              <li>
                <Button
                  text="Uitloggen"
                  icon={<BsBoxArrowUp />}
                  onClick={logOut}
                  color="monza-red"
                />
              </li>
            </ul>
          </div>
        )}
        <div className={`mx-auto w-32 ${isAuthenticated && 'pt-16'}`}>
          <Link to={routes.home()} title="Ohayo Goededagu" aria-label="Home">
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
          <span className="whitespace-nowrap">Ohayo&nbsp;Goededagu</span> |{' '}
          <span className="whitespace-nowrap">おはよ&nbsp;グデダギュ</span>
        </h1>
        <pre className="mt-3">Japan 2023</pre>
        <nav>
          <ul className="mt-3 flex flex-wrap justify-center gap-2">
            <li>
              <Link className="rw-button" to={routes.home()}>
                Blog
              </Link>
            </li>
            <li>
              <Link className="rw-button" to={routes.route()}>
                Route
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
      <main className="mx-auto max-w-6xl flex-grow md:grid">{children}</main>
      <footer className="bg-slate-500 py-4 text-center text-white">
        <div>Bedankt voor het volgen van onze avonturen in Japan!</div>
      </footer>
    </div>
  )
}

export default BlogLayout
