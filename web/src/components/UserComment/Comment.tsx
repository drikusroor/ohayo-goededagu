import { useEffect, useMemo, useState } from 'react'

import { BsReplyFill, BsTrash } from 'react-icons/bs'
import type { Comment } from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { QUERY as FindArticleQuery } from 'src/components/ArticleCell'
import Avatar from 'src/components/Avatar/Avatar'
import Button from 'src/components/Button/Button'
import DisplayDatetime from 'src/components/DisplayDatetime/DisplayDatetime'
import RenderBody from 'src/components/RenderBody/RenderBody'
import Thumbs from 'src/components/Thumbs/Thumbs'
import { getUserName } from 'src/lib/get-user-name'

interface ICommentProps {
  comment: Comment
  onClickReply?: (comment: Comment) => void
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

const DELETE_COMMENT = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`

export default ({ comment, onClickReply }: ICommentProps) => {
  const { currentUser } = useAuth()

  const [deleteFadeOut, setDeleteFadeOut] = useState(false)
  const [thumbsDisabled, setThumbsDisabled] = useState(false)

  useEffect(() => {
    setThumbsDisabled(false)
  }, [comment?.thumbs])

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

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onCompleted: () => {
      toast.success('Comment deleted')
    },
    refetchQueries: [
      {
        query: FindArticleQuery,
        variables: { id: comment.postId, $id: comment.postId },
      },
    ],
  })

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this comment?')) {
      setDeleteFadeOut(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      deleteComment({ variables: { id: comment.id } })
    }
  }

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
    if (!thumbsDisabled) {
      setThumbsDisabled(true)
    }
    createUpdateOrDeleteThumb({
      variables: { input: { commentId: comment.id, up } },
    })
  }

  const userName = useMemo(() => {
    return getUserName(comment.user)
  }, [comment.user])

  return (
    <div
      className={`z-10 rounded-lg bg-slate-100 p-4 transition-opacity ${ratingOpacity} group relative ${
        deleteFadeOut ? 'animate-fade-out' : ''
      }`}
    >
      <div className="flex flex-row flex-wrap items-center gap-4">
        <Avatar
          src={comment.user?.profile?.avatar}
          alt={userName}
          name={userName}
          userId={comment.user.id}
        />

        <div>
          <span className="text-base font-semibold text-slate-700">
            {userName}
          </span>
          <DisplayDatetime
            datetime={comment.createdAt}
            className="text-sm text-slate-500"
          />
        </div>
        <div className="ml-auto flex flex-row items-center gap-2">
          {onClickReply && (
            <Button
              data-testid="replyButton"
              text="Reply"
              icon={<BsReplyFill />}
              onClick={() => onClickReply(comment)}
              className="text-xs lg:text-base"
              title="Reply"
              textStay
              variant="outlined"
            />
          )}
        </div>
      </div>
      <div className="ml-14 mt-4 text-sm leading-relaxed text-slate-600">
        <RenderBody body={comment.body} />
      </div>
      <div className="flex flex-row items-center justify-end gap-2">
        {currentUser?.id === comment.user.id && (
          <Button
            onClick={handleDelete}
            className="user-select-none rounded font-semibold uppercase transition-opacity group-hover:cursor-pointer group-hover:opacity-100 md:mt-0 md:opacity-0"
            color="monza-red"
            title="Delete comment"
            icon={<BsTrash />}
          />
        )}
        <Thumbs
          thumbs={comment.thumbs}
          onThumb={handleThumbClick}
          disabled={thumbsDisabled}
        />
      </div>
    </div>
  )
}
