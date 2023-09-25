import { useMemo } from 'react'

import { User } from 'types/graphql'

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
    <div className="grid max-w-6xl gap-8">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold">Gebruikersprofiel</h2>
        {profile ? (
          <div className="mt-3">
            <Person profile={profile} />
          </div>
        ) : (
          <div className="mt-3 text-slate-500">
            Deze gebruiker heeft geen profiel.
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
            <div className="text-slate-500">This user has no posts.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewProfile
