import type {
  FindViewProfileQuery,
  FindViewProfileQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ViewProfile from '../ViewProfile/ViewProfile'

export const QUERY = gql`
  query FindViewProfileQuery($id: Int!) {
    user(id: $id) {
      id
      profile {
        id
        name
        japaneseName
        bio
        avatar
        createdAt
      }
      posts {
        id
        title
        body
        createdAt
        videoPost {
          videoUrl
        }
        user {
          name
          profile {
            name
            avatar
          }
        }
        type
        coverImage {
          url
        }
        comments {
          id
        }
        location
        imageGalleries {
          id
          imageGallery {
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
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindViewProfileQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  user,
}: CellSuccessProps<FindViewProfileQuery, FindViewProfileQueryVariables>) => {
  return <ViewProfile user={user} />
}
