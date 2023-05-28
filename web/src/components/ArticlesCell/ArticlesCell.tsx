import type { ArticlesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Article from '../Article/Article'
import Skeleton from '../Skeleton/Skeleton'

export const QUERY = gql`
  query ArticlesQuery {
    articles: posts {
      id
      title
      body
      createdAt
    }
  }
`
export const Loading = () => <div>
  {Array.from({ length: 5 }).map((_, i) => (
    <>
      <Skeleton className="rounded-sm mb-2 md:w-1/2 h-8" />
      <Skeleton className="rounded-sm mb-2 md:w-1/3 h-8" />
      <Skeleton className="rounded-sm mb-5 w-full h-32" />
    </>
  ))}
</div>

export const Empty = () => <div>There are no posts</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  return (
    <ul>
      {articles.map((article) => {
        return <Article key={article.id} article={article} />
      })}
    </ul>
  )
}
