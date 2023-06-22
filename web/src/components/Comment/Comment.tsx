import type { Comment } from 'types/graphql'

interface ICommentProps {
  comment: Comment
}

export default ({ comment }: ICommentProps) => {
  return (
    <div className="rounded-lg bg-slate-100 p-4 ">
      <div className="flex flex-row items-center gap-4">
        {comment.user.profile?.avatar ? (
          <img
            src={comment.user.profile?.avatar}
            alt="Avatar"
            className="h-10 w-10 rounded-full object-cover shadow"
            width={40}
            height={40}
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-slate-500">
            {comment.user.name
              ? comment.user.name[0]
              : comment.user.email
              ? comment.user.email[0]
              : 'A'}
          </div>
        )}

        <div>
          <span className="text-base font-semibold text-slate-700">
            {comment.user.name
              ? comment.user.name
              : comment.user.email
              ? comment.user.email
              : 'Anonymous'}
          </span>
          <span className="ml-2 text-sm text-slate-500">
            | {new Date(comment.createdAt).toLocaleString('nl-NL')}
          </span>
        </div>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-slate-600">
        {comment.body}
      </div>
    </div>
  )
}
