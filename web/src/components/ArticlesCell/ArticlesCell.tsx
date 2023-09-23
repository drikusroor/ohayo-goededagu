import type { ArticlesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ArticlePreview from '../Article/components/ArticlePreview/ArticlePreview'
import { EPostType } from '../ArticleTypeIcon/ArticleTypeIcon'
import Skeleton from '../Skeleton/Skeleton'

export const QUERY = gql`
  query ArticlesQuery($input: QueryPostsInput) {
    result: posts(input: $input) {
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
            }
          }
        }
      }
      pagination {
        count
        page
        perPage
      }
      activeFilters {
        postTypes
        authors
        from
        to
      }
    }
  }
`

interface Props {
  vlog?: boolean
  gallery?: boolean
  result: CellSuccessProps<ArticlesQuery>
}

export const Loading = () => (
  <div className="grid max-w-6xl">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i}>
        <Skeleton className="m-3 h-[480px] w-full rounded-md md:m-10" />
      </div>
    ))}
  </div>
)

export const Empty = () => <div>There are no posts</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ result, vlog, gallery }: Props) => {
  const vlogs = result.posts.filter((article) => {
    if (article.type === EPostType.VIDEO) {
      return article
    }
  })

  const galleries = result.posts.filter((article) => {
    if (article.type === EPostType.PHOTO_GALLERY) {
      return article
    }
  })

  if (vlog) {
    return (
      <ul className="flex flex-col justify-center gap-6 p-3 md:gap-12 md:p-10">
        {vlogs.map((article) => {
          return <ArticlePreview key={article.id} article={article} />
        })}
      </ul>
    )
  }

  if (gallery) {
    return (
      <ul className="flex flex-col justify-center gap-6 p-3 md:gap-12 md:p-10">
        {galleries.map((article) => {
          return <ArticlePreview key={article.id} article={article} />
        })}
      </ul>
    )
  }

  return (
    <ul className="flex flex-col justify-center gap-6 p-3 md:gap-12 md:p-10">
      {result.posts.map((article) => {
        return <ArticlePreview key={article.id} article={article} />
      })}
    </ul>
  )
}
