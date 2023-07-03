import type { ArticlesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ArticlePreview from '../Article/components/ArticlePreview'
import Skeleton from '../Skeleton/Skeleton'

export const QUERY = gql`
  query ArticlesQuery {
    articles: posts {
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
          avatar
        }
      }
      type
    }
  }
`
export const Loading = () => (
  <div>
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i}>
        <Skeleton className="mb-2 h-8 rounded-sm md:w-1/2" />
        <Skeleton className="mb-2 h-8 rounded-sm md:w-1/3" />
        <Skeleton className="mb-5 h-32 w-full rounded-sm" />
      </div>
    ))}
  </div>
)

export const Empty = () => <div>There are no posts</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  return (
    <ul>
      {articles.map((article) => {
        return <ArticlePreview key={article.id} article={article} />
      })}
    </ul>
  )
}
