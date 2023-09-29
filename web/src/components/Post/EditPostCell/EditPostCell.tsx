import type { EditPostById, UpdatePostInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PostForm from 'src/components/Post/PostForm'

export const QUERY = gql`
  query EditPostById($id: Int!) {
    post: post(id: $id) {
      id
      title
      body
      titleEn
      bodyEn
      type
      createdAt
      published
      videoPost {
        videoUrl
      }
      coverImage {
        id
        imageId
        url
      }
      location
      user {
        id
        name
        profile {
          id
          name
          avatar
        }
      }
      imageGalleries {
        id
        imageGallery {
          id
          name
          description
          images {
            id
            url
            imageId
            alt
            description
          }
        }
      }
    }
    profile: profileSelf {
      avatar
      name
    }
  }
`
const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($id: Int!, $input: UpdatePostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      body
      titleEn
      bodyEn
      createdAt
      published
      videoPost {
        videoUrl
      }
      coverImage {
        id
        imageId
        url
      }
      location
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ post, profile }: CellSuccessProps<EditPostById>) => {
  const [updatePost, { loading, error }] = useMutation(UPDATE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post updated')
      navigate(routes.posts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdatePostInput, id: EditPostById['post']['id']) => {
    updatePost({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Post {post?.id} by {post.user.name}
        </h2>
      </header>
      <div className="rw-segment-main">
        <PostForm
          post={post}
          profile={profile}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
