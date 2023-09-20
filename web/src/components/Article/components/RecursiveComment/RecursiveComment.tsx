import { Post, Comment as TComment } from 'types/graphql'

import CommentForm from 'src/components/CommentForm/CommentForm'
import Comment from 'src/components/UserComment/Comment'
import { classNames } from 'src/lib/class-names'

export interface RecursiveCommentProps {
  comment: TComment
  comments: TComment[]
  replyToComment?: TComment
  setReplyToComment: (comment: TComment) => void
  article: Post
  level?: number
}

export const RecursiveComment = ({
  comment,
  comments = [],
  replyToComment,
  setReplyToComment,
  article,
  level = 0,
}: RecursiveCommentProps) => {
  return (
    <div className={classNames('relative', comment.parentId && 'ml-4 mt-4')}>
      {comments.some((c) => c.parentId === comment.id) && (
        <div className="absolute bottom-1 left-2 top-0 w-[1px] transform rounded-b-md bg-slate-300"></div>
      )}
      <Comment
        comment={comment}
        onClickReply={level < 5 && setReplyToComment}
      />
      {replyToComment?.id === comment.id && (
        <CommentForm
          postId={article.id}
          replyToComment={replyToComment}
          onCancel={() => setReplyToComment(undefined)}
        />
      )}
      {comments
        .filter((c) => c.parentId === comment.id)
        .map((c) => (
          <RecursiveComment
            key={c.id}
            comment={c}
            comments={comments}
            replyToComment={replyToComment}
            setReplyToComment={setReplyToComment}
            article={article}
            level={level + 1}
          />
        ))}
    </div>
  )
}
