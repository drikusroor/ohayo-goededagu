import { BsPencil, BsTrash } from 'react-icons/bs'
import type {
  DeleteCommentMutationVariables,
  FindCommentById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import Button from 'src/components/Button/Button'
import { checkboxInputTag, timeTag } from 'src/lib/formatters'

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`

interface Props {
  comment: NonNullable<FindCommentById['comment']>
}

const Comment = ({ comment }: Props) => {
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Comment deleted')
      navigate(routes.comments())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteCommentMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete comment ' + id + '?')) {
      deleteComment({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Comment {comment.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{comment.id}</td>
            </tr>
            <tr>
              <th>Body</th>
              <td>{comment.body}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(comment.createdAt)}</td>
            </tr>
            <tr>
              <th>User id</th>
              <td>{comment.userId}</td>
            </tr>
            <tr>
              <th>Post id</th>
              <td>{comment.postId}</td>
            </tr>
            <tr>
              <th>Parent id</th>
              <td>{comment.parentId}</td>
            </tr>
            <tr>
              <th>Deleted</th>
              <td>{checkboxInputTag(comment.deleted)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="button-group">
        <Button
          text="Edit"
          color="cobalt-blue"
          icon={<BsPencil />}
          onClick={() => navigate(routes.editComment({ id: comment.id }))}
        />
        <Button
          text="Delete"
          color="monza-red"
          icon={<BsTrash />}
          onClick={() => onDeleteClick(comment.id)}
        />
      </nav>
    </>
  )
}

export default Comment
