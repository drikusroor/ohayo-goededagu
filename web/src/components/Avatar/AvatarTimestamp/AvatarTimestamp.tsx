import { Post } from 'types/graphql'

import Avatar from 'src/components/Avatar/Avatar'
import DisplayDatetime from 'src/components/DisplayDatetime/DisplayDatetime'
import LocationPin from 'src/components/LocationPin/LocationPin'

interface Props {
  article: Post
}

const AvatarTimestamp = ({ article }: Props) => {
  const authorName =
    article.user.profile?.name || article.user.name || 'Anonymous'

  return (
    <div className="mb-2 flex flex-row items-center gap-2">
      <Avatar
        src={article.user?.profile?.avatar}
        alt={authorName}
        name={authorName}
      />
      <div>
        <span
          className="text-sm text-slate-500"
          title={article.user.name || article.user.email}
        >
          {authorName}
        </span>

        <DisplayDatetime
          datetime={article.createdAt}
          className="text-sm text-slate-500"
        />
        <LocationPin location={article.location} className="text-white" />
      </div>
    </div>
  )
}

export default AvatarTimestamp
