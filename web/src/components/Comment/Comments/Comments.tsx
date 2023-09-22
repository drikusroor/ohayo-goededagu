import type {
  DeleteCommentMutationVariables,
  FindComments,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Comment/CommentsCell'
import DashboardTable from 'src/components/Table/DashboardTable'

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`

const CommentsList = ({ comments }: FindComments) => {
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    onCompleted: () => {
      toast.success('Comment deleted')
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

  const onDeleteClick = (id: DeleteCommentMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete comment ' + id + '?')) {
      deleteComment({ variables: { id } })
    }
  }

  console.log('comments', comments)

  const headers = [
    'Id',
    'Body',
    'Created at',
    'Author',
    'User id',
    'Post id',
    'Parent id',
    'Deleted',
    'Show',
    'Edit',
    'Delete',
  ]

  return (
    <DashboardTable
      headers={headers}
      data={comments}
      onShow={(comment) => navigate(routes.comment({ id: comment.id }))}
      onEdit={(comment) => navigate(routes.comment({ id: comment.id }))}
      onDelete={(comment) => onDeleteClick(comment.id)}
    />
  )
}

export default CommentsList
