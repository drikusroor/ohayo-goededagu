import type { Comment } from 'types/graphql'

import Avatar from '../Avatar/Avatar'

interface ICommentProps {
  comment: Comment
}

export default ({ comment }: ICommentProps) => {
  return (
    <div className="rounded-lg bg-slate-100 p-4 ">
      <div className="flex flex-row items-center gap-4">
        <Avatar
          src={comment.user?.profile?.avatar}
          alt={comment.user.name}
          name={comment.user.name || comment.user.email}
        />

        <div>
          <span className="text-base font-semibold text-slate-700">
            {comment.user.name
              ? comment.user.name
              : comment.user.email
              ? comment.user.email
              : 'Anonymous'}
          </span>
          <span className="ml-2 text-sm text-slate-500">
            |{' '}
            {new Date(comment.createdAt).toLocaleString('nl-NL', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </div>
      <div className="ml-14 mt-4 text-sm leading-relaxed text-slate-600">
        {comment.body}
      </div>
    </div>
  )
}
