import { BsFillPencilFill, BsFillTrash3Fill, BsSearch } from 'react-icons/bs'
import type { DeletePostMutationVariables, FindPosts } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ArticleTypeIcon, {
  EPostType,
} from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import Button from 'src/components/Button/Button'
import { QUERY } from 'src/components/Post/PostsCell'
import { timeTag, truncate } from 'src/lib/formatters'

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

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Type</th>
            <th>Published</th>
            <th>Created at</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{truncate(post.id)}</td>
              <td>{truncate(post.title)}</td>
              <td>{truncate(post.body)}</td>
              <td>
                <ArticleTypeIcon type={post.type as EPostType} />
              </td>
              <td>{post.published ? 'Yes' : 'No'}</td>
              <td>{timeTag(post.createdAt)}</td>
              <td>
                <nav className="rw-table-actions gap-1">
                  <Button
                    title={'Show post' + post.id}
                    onClick={() => onNavigatePost(post)}
                    className="rw-button flex items-center gap-2 text-base transition-colors sm:text-sm"
                    color="rw-gray"
                    icon={BsSearch}
                    variant="outlined"
                  >
                    <BsSearch />
                    <span className="hidden sm:inline-block">Show</span>
                  </Button>
                  <Button
                    title={'Edit post' + post.id}
                    onClick={() => onNavigateEditPost(post)}
                    className="rw-button rw-button-blue flex items-center gap-2 text-base transition-colors sm:text-sm"
                    color="cobalt-blue"
                    variant="outlined"
                  >
                    <BsFillPencilFill />
                    <span className="hidden sm:inline-block">Edit</span>
                  </Button>
                  <Button
                    title={'Delete post ' + post.id}
                    onClick={() => onDeleteClick(post.id)}
                    className="rw-button rw-button-red flex items-center gap-2 text-base transition-colors sm:text-sm"
                    color="monza-red"
                    variant="outlined"
                  >
                    <BsFillTrash3Fill />
                    <span className="hidden sm:inline-block">Delete</span>
                  </Button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PostsList
