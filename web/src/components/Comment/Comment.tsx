import type { Comment } from 'types/graphql'

interface ICommentProps {
  comment: Comment
}

export default ({ comment }: ICommentProps) => {
  return (
    <div className="bg-slate-100 p-2">
      <div className="flex flex-row items-end gap-2">
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
      <div className="mt-2">{comment.body}</div>
    </div>
  )
}
