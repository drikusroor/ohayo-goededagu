import { MdOutlineLogin, MdOutlinePersonAdd } from 'react-icons/md'

import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import ArticlesCell from 'src/components/ArticlesCell'
import Button from 'src/components/Button/Button'

const HomePage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Home" description="Home page" />

      {currentUser ? (
        <ArticlesCell />
      ) : (
        <div className="mx-auto max-w-lg overflow-hidden bg-white shadow-lg sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-bold leading-6 text-gray-900">
              Welkom!
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-700">
              Je moet eerst inloggen om de inhoud van deze blog te kunnen
              aanschouwen.
            </p>
            <div className="mt-5 flex flex-row justify-between gap-2 md:mt-12">
              <Link to="/login">
                <Button
                  className="flex flex-row items-center gap-2"
                  variant="outlined"
                >
                  <span>Inloggen</span>
                  <MdOutlineLogin />
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="flex flex-row items-center gap-2 bg-sky-500">
                  <span>Registreren</span>
                  <MdOutlinePersonAdd />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default HomePage
