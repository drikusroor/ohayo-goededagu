import type { FindArticleQuery, FindArticleQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Article from '../Article/Article'
import Skeleton from '../Skeleton/Skeleton'

export const QUERY = gql`
  query FindArticleQuery($id: Int!) {
    article: post(id: $id) {
      id
      title
      body
      titleEn
      bodyEn
      type
      createdAt
      videoPost {
        videoUrl
      }
      coverImage {
        url
      }
      location
      user {
        id
        name
        profile {
          name
          japaneseName
          avatar
          bio
          id
        }
      }
      comments {
        id
        body
        createdAt
        postId
        parentId
        deleted
        edited
        user {
          id
          name
          email
          profile {
            name
            avatar
          }
        }
        thumbs {
          id
          userId
          up
          user {
            email
            profile {
              name
            }
          }
        }
      }
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
            title
            description
          }
        }
      }
    }
  }
`

export const Loading = () => (
  <div className="p-3 md:p-10">
    <Skeleton className="h-8 w-64" />
    <Skeleton className="mt-2 h-6 w-48" />
    <Skeleton className="mt-4 h-64 w-full" />
    <Skeleton className="mt-4 h-8 w-48" />
    <Skeleton className="mt-4 h-32 max-w-xl" />
    <Skeleton className="mt-4 h-32 max-w-xl" />
    <Skeleton className="mt-4 h-32 max-w-xl" />
  </div>
)

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindArticleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  article,
}: CellSuccessProps<FindArticleQuery, FindArticleQueryVariables>) => {
  return <Article article={article} />
}
