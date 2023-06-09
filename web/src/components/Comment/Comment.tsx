import { useMemo } from 'react'

import type { Comment } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY as FindArticleQuery } from 'src/components/ArticleCell'

import Avatar from '../Avatar/Avatar'
import Thumbs from '../Thumbs/Thumbs'

interface ICommentProps {
  comment: Comment
}

const CREATE_UPDATE_OR_DELETE_THUMB = gql`
  mutation CreateUpdateOrDeleteMutation(
    $input: CreateUpdateOrDeleteThumbInput!
  ) {
    createUpdateOrDeleteThumb(input: $input) {
      commentId
      up
    }
  }
`

export default ({ comment }: ICommentProps) => {
  const [createUpdateOrDeleteThumb] = useMutation(
    CREATE_UPDATE_OR_DELETE_THUMB,
    {
      onCompleted: (data) => {
        toast.success(
          `You voted this comment ${
            data.createUpdateOrDeleteThumb.up ? 'up' : 'down'
          }`
        )
      },
      refetchQueries: [
        {
          query: FindArticleQuery,
          variables: { id: comment.postId, $id: comment.postId },
        },
      ],
    }
  )

  const rating = useMemo(() => {
    if (comment.thumbs.filter((t) => !t.up).length === 0) {
      return 1
    }

    const rating =
      comment.thumbs.filter((t) => t.up).length -
        comment.thumbs.filter((t) => !t.up).length >
      0
        ? 0
        : -1

    return rating
  }, [comment.thumbs])

  const ratingOpacity = useMemo(() => {
    if (rating === 0) {
      return 'opacity-90'
    }

    if (rating < 0) {
      return 'opacity-75'
    }

    return ''
  }, [rating])

  const handleThumbClick = (up: boolean) => {
    createUpdateOrDeleteThumb({
      variables: { input: { commentId: comment.id, up } },
    })
  }

  return (
    <div
      className={`rounded-lg bg-slate-100 p-4 transition-opacity ${ratingOpacity}`}
    >
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
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
        <div className="ml-auto">
          <Thumbs
            thumbs={comment.thumbs}
            entityId={comment.id}
            onThumb={handleThumbClick}
          />
        </div>
      </div>
      <div className="ml-14 mt-4 text-sm leading-relaxed text-slate-600">
        {comment.body}
      </div>
    </div>
  )
}
