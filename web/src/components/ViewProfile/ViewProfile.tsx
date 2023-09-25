import { useMemo } from 'react'

import { User } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import Person from 'src/pages/AboutPage/Person'

import ArticlePreview from '../Article/components/ArticlePreview/ArticlePreview'

interface IViewProfileProps {
  user: User
}

const ViewProfile = ({ user }: IViewProfileProps) => {
  const { profile, posts = [] } = user

  const sortedPosts = useMemo(() => {
    if (posts) {
      return [...posts].sort((a, b) => {
        if (new Date(a.createdAt) > new Date(b.createdAt)) return -1
        if (new Date(a.createdAt) < new Date(b.createdAt)) return 1
        return 0
      })
    }
  }, [posts])

  return (
    <div className="grid max-w-6xl gap-8 px-3 py-3 lg:py-10 xl:px-0">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold">Profielpagina</h2>
        {profile ? (
          <div className="mt-3">
            <Person profile={profile} />
          </div>
        ) : (
          <div className="mt-3 text-slate-500">
            <p>
              {' '}
              Deze gebruiker heeft geen profiel en verdient billenkoek. 🍑👏
            </p>
            <p className="mt-3">
              Heb je ook geen profiel? Ga naar de{' '}
              <Link
                className="text-blue-500 underline hover:text-blue-700"
                to={routes.editAccount()}
              >
                accountpagina
              </Link>{' '}
              om een profiel aan te maken.
            </p>
          </div>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold">Posts ({posts.length})</h2>

        <div className="mt-3 grid gap-4">
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <ArticlePreview key={post.id} article={post} />
            ))
          ) : (
            <div className="text-slate-500">
              Deze gebruiker heeft geen posts.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewProfile
