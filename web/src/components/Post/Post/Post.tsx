import { BsFillPencilFill, BsFillTrash3Fill } from 'react-icons/bs'
import type { DeletePostMutationVariables, FindPostById } from 'types/graphql'

import { routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import Button from 'src/components/Button/Button'
import RenderBody from 'src/components/RenderBody/RenderBody'
import { timeTag } from 'src/lib/formatters'

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`

interface Props {
  post: NonNullable<FindPostById['post']>
}

const Post = ({ post }: Props) => {
  const { currentUser } = useAuth()
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post deleted')
      navigate(routes.posts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePostMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete post ' + id + '?')) {
      deletePost({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Post {post.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{post.id}</td>
            </tr>
            <tr>
              <th>Title</th>
              <td>{post.title}</td>
            </tr>
            <tr>
              <th>Body</th>
              <td>
                <RenderBody body={post.body} />
              </td>
            </tr>
            <tr>
              <th>Published</th>
              <td>{post.published ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <th>Author</th>
              <td>{post.user.name ? post.user.name : post.user.email}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(post.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="button-group">
        <Button
          text="Edit"
          icon={<BsFillPencilFill />}
          title={'Edit post ' + post.id}
          onClick={() => navigate(routes.editPost({ id: post.id }))}
        />
        {post?.user?.name === currentUser?.name && (
          <Button
            title={'Delete post ' + post.id}
            text="Delete"
            icon={<BsFillTrash3Fill />}
            onClick={() => onDeleteClick(post.id)}
            className="rw-button flex items-center gap-2 text-base transition-colors sm:text-sm"
            color="monza-red"
          />
        )}
      </nav>
    </>
  )
}

export default Post
