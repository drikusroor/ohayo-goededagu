import type { Comment } from 'types/graphql'

interface ICommentProps {
  comment: Comment
}

export default ({ comment }: ICommentProps) => {
  return (
    <div className="bg-slate-100 p-2">
      <div className="flex flex-row items-center gap-2">
        {comment.user.profile?.avatar ? (
          <img
            src={comment.user.profile?.avatar}
            alt="Avatar"
            className="h-8 w-8 rounded-full"
            width={32}
            height={32}
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-200">
            <span className="text-slate-500">
              {comment.user.name
                ? comment.user.name[0]
                : comment.user.email
                ? comment.user.email[0]
                : 'A'}
            </span>
          </div>
        )}

        <span className="text-sm text-slate-500">
          {comment.user.name
            ? comment.user.name
            : comment.user.email
            ? comment.user.email
            : 'Anonymous'}
        </span>
        <span className="text-sm text-slate-500">
          | {new Date(comment.createdAt).toLocaleString('nl-NL')}
        </span>
      </div>
      <div className="ml-10 mt-2">{comment.body}</div>
    </div>
  )
}
