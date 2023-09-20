import { Post } from 'types/graphql'

import Avatar from 'src/components/Avatar/Avatar'
import DisplayDatetime from 'src/components/DisplayDatetime/DisplayDatetime'
import LocationPin from 'src/components/LocationPin/LocationPin'
import { classNames } from 'src/lib/class-names'

interface Props {
  article: Post
  hasImage?: boolean
}

const AvatarTimestamp = ({ article, hasImage }: Props) => {
  const authorName =
    article.user.profile?.name || article.user.name || 'Anonymous'

  return (
    <div className="flex gap-2">
      <div className="flex flex-row items-center gap-2">
        <Avatar
          src={article.user?.profile?.avatar}
          alt={authorName}
          name={authorName}
        />
        <div>
          <span
            className={classNames(
              'text-sm',
              hasImage ? 'text-white' : 'text-slate-500'
            )}
            title={article.user.name || article.user.email}
          >
            {authorName}
          </span>
          <DisplayDatetime
            datetime={article.createdAt}
            className={classNames(
              'text-sm',
              hasImage ? 'text-white' : 'text-slate-500'
            )}
          />
        </div>
      </div>
      <div className="mb-1 flex items-end">
        <LocationPin
          location={article.location}
          className={classNames(
            'text-sm',
            hasImage ? 'text-white' : 'text-slate-500'
          )}
        />
      </div>
    </div>
  )
}

export default AvatarTimestamp
