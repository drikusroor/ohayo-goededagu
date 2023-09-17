import { User } from 'types/graphql'

import Person from 'src/pages/AboutPage/Person'

import ArticlePreview from '../Article/components/ArticlePreview/ArticlePreview'

interface IViewProfileProps {
  user: User
}

const ViewProfile = ({ user }: IViewProfileProps) => {
  const { profile, posts = [] } = user

  return (
    <div className="grid max-w-6xl gap-8">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold">Profile</h2>
        {profile ? (
          <div className="mt-3">
            <Person
              name={profile.name}
              quote={profile.japaneseName}
              imgSrc={profile.avatar}
              story={profile.bio}
            />
          </div>
        ) : (
          <div className="mt-3 text-slate-500">This user has no profile.</div>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold">Posts ({posts.length})</h2>

        <div className="mt-3 grid gap-4">
          {posts.length > 0 ? (
            posts.map((post) => <ArticlePreview key={post.id} article={post} />)
          ) : (
            <div className="text-slate-500">This user has no posts.</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewProfile
