import { useEffect, useState } from 'react'

import type { FindPostThumbsByPostIdQuery } from 'types/graphql'

import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import Thumbs from '../Thumbs/Thumbs'

export const QUERY = gql`
  query FindPostThumbsByPostIdQuery($postId: Int!) {
    postThumbs: postThumbsByPostId(postId: $postId) {
      id
      userId
      postId
      up
      user {
        email
        profile {
          name
        }
      }
    }
    post(id: $postId) {
      id
    }
  }
`

const CREATE_UPDATE_OR_DELETE_POST_THUMB = gql`
  mutation CreateUpdateOrDeletePostThumbMutation(
    $input: CreateUpdateOrDeletePostThumbInput!
  ) {
    createUpdateOrDeletePostThumb(input: $input) {
      postId
      up
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = ({ postThumbs, post }) => {
  const postId = post.id

  const [createUpdateOrDeletePostThumb] = useMutation(
    CREATE_UPDATE_OR_DELETE_POST_THUMB,
    {
      onCompleted: (data) => {
        toast.success(
          `You've rated this post as ${
            data.createUpdateOrDeletePostThumb.up ? 'nice' : 'bad'
          }`
        )
      },
      refetchQueries: [
        {
          query: QUERY,
          variables: { postId },
        },
      ],
    }
  )

  const [thumbsDisabled, setThumbsDisabled] = useState(false)

  useEffect(() => {
    setThumbsDisabled(false)
  }, [postThumbs])

  const handleThumbClick = (up: boolean) => {
    if (!thumbsDisabled) {
      setThumbsDisabled(true)
    }
    createUpdateOrDeletePostThumb({
      variables: { input: { postId, up } },
    })
  }

  return (
    <div className="rounded bg-white p-1">
      <Thumbs
        thumbs={postThumbs}
        onThumb={handleThumbClick}
        disabled={thumbsDisabled}
      />
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  postThumbs = [],
  post,
  readOnly,
  light,
}: CellSuccessProps<FindPostThumbsByPostIdQuery> & {
  readOnly?: boolean
  light?: boolean
}) => {
  const postId = post.id

  const [createUpdateOrDeletePostThumb] = useMutation(
    CREATE_UPDATE_OR_DELETE_POST_THUMB,
    {
      onCompleted: (data) => {
        toast.success(
          `You've rated this post as ${
            data.createUpdateOrDeletePostThumb.up ? 'nice' : 'bad'
          }`
        )
      },
      refetchQueries: [
        {
          query: QUERY,
          variables: { postId },
        },
      ],
    }
  )

  const [thumbsDisabled, setThumbsDisabled] = useState(false)

  useEffect(() => {
    setThumbsDisabled(false)
  }, [postThumbs])

  const handleThumbClick = (up: boolean) => {
    if (!thumbsDisabled) {
      setThumbsDisabled(true)
    }
    createUpdateOrDeletePostThumb({
      variables: { input: { postId, up } },
    })
  }

  const readOnlyHasThumbs = readOnly && postThumbs.length > 0

  return (
    <>
      {readOnlyHasThumbs && (
        <Thumbs thumbs={postThumbs} readOnly={readOnly} light={light} />
      )}
      {!readOnly && (
        <Thumbs
          thumbs={postThumbs}
          onThumb={handleThumbClick}
          disabled={thumbsDisabled}
        />
      )}
    </>
  )
}
