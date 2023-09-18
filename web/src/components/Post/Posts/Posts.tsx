import type { DeletePostMutationVariables, FindPosts } from 'types/graphql'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Post/PostsCell'
import DashboardTable from 'src/components/Table/DashboardTable'

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`

const PostsList = ({ posts }: FindPosts) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post deleted')
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

  const onNavigatePost = (post: 'article') => {
    navigate(routes.post({ id: post.id }))
  }

  const onNavigateEditPost = (post: 'article') => {
    navigate(routes.editPost({ id: post.id }))
  }

  const onDeleteClick = (id: DeletePostMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete post ' + id + '?')) {
      deletePost({ variables: { id } })
    }
  }

  const headers = [
    'Id',
    'Title',
    'Body',
    'Type',
    'Published',
    'Author',
    'Created at',
    '',
    '',
    '',
  ]

  return (
    <>
      <DashboardTable
        headers={headers}
        data={posts}
        onShow={(post) => onNavigatePost(post)}
        onEdit={(post) => onNavigateEditPost(post)}
        onDelete={(postId) => onDeleteClick(postId)}
      />
    </>
  )
}

export default PostsList
