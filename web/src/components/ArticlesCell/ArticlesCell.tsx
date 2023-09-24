import type { ArticlesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ArticlePreview from '../Article/components/ArticlePreview/ArticlePreview'
import Pagination from '../Pagination/Pagination'
import PostFilterMenu from '../PostFilterMenu/PostFilterMenu'
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
        <Skeleton className="m-3 h-80 rounded-md md:m-10 md:h-[480px]" />
      </div>
    ))}
  </div>
)

export const Empty = () => <div>There are no posts</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ result, vlog, gallery }: Props) => {
  const { activeFilters, posts, pagination } = result

  return (
    <>
      <div className="flex justify-center px-3">
        <PostFilterMenu
          activeFilters={activeFilters}
          showPostTypeFilter={!vlog && !gallery}
        />
      </div>
      <ul className="flex flex-col justify-center gap-6 p-3 md:gap-12 md:p-10">
        {posts.map((article) => {
          return <ArticlePreview key={article.id} article={article} />
        })}
      </ul>
      <div className="py-10">
        <Pagination
          pagination={pagination}
          routeName={vlog ? 'vlog' : gallery ? 'galleries' : 'home'}
        />
      </div>
    </>
  )
}
