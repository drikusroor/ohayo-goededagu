import {
  BsChatLeft,
  BsHandThumbsDownFill,
  BsHandThumbsUpFill,
  BsJournals,
} from 'react-icons/bs'
import type { DeleteThumbMutationVariables, FindThumbs } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/DashboardThumb/ThumbsCell'
import { truncate } from 'src/lib/formatters'
import { getUserName } from 'src/lib/get-user-name'
import { dateStringToTimeAgo } from 'src/lib/time-ago'

const DELETE_THUMB_MUTATION = gql`
  mutation DeleteThumbMutation($id: Int!) {
    deleteThumb(id: $id) {
      id
    }
  }
`

const ThumbsList = ({ thumbs }: FindThumbs) => {
  const [deleteThumb] = useMutation(DELETE_THUMB_MUTATION, {
    onCompleted: () => {
      toast.success('Thumb deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteThumbMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete thumb ' + id + '?')) {
      deleteThumb({ variables: { id } })
    }
  }

  const sortedThumbs = [...thumbs].sort((a, b) => {
    if (a.createdAt > b.createdAt) return -1
    if (a.createdAt < b.createdAt) return 1
    return 0
  })

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created</th>
            <th>User</th>
            <th>Post / Comment</th>
            <th>Up</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {sortedThumbs.map((thumb) => (
            <tr key={thumb.id}>
              <td>{truncate(thumb.id)}</td>
              <td>{dateStringToTimeAgo(thumb.createdAt)}</td>
              <td>
                {getUserName(thumb.user)} ({truncate(thumb.userId)})
              </td>
              <td>
                {thumb.comment?.postId && (
                  <Link
                    to={
                      routes.article({ id: thumb.comment?.postId }) +
                      '#comment-' +
                      thumb.commentId
                    }
                    title={'Show article ' + thumb.comment?.postId + ' detail'}
                    className="mr-2 text-blue-500 underline hover:text-blue-700"
                  >
                    <BsChatLeft className="mr-2 inline-block" />
                    {thumb.comment?.postId} / {thumb.commentId}
                  </Link>
                )}
                {thumb.postId && (
                  <Link
                    to={routes.article({ id: thumb.postId })}
                    title={'Show article ' + thumb.postId + ' detail'}
                    className="mr-2 text-blue-500 underline hover:text-blue-700"
                  >
                    <BsJournals className="mr-2 inline-block" />
                    {thumb.postId}
                  </Link>
                )}
              </td>
              <td>
                {thumb.up ? (
                  <BsHandThumbsUpFill className="text-green-600" />
                ) : (
                  <BsHandThumbsDownFill className="text-red-600" />
                )}
              </td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.thumb({ id: thumb.id })}
                    title={'Show thumb ' + thumb.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editThumb({ id: thumb.id })}
                    title={'Edit thumb ' + thumb.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete thumb ' + thumb.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(thumb.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ThumbsList
