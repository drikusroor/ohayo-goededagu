import type { ArticlesQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  return (
    <ul>
      {articles.map((item) => {
        return (
          <li key={item.id} className="mb-6">
            <h2 className="text-2xl">{item.title}</h2>
            <p className="mb-3 text-gray-500">
              {new Date(item.createdAt).toLocaleString()}
            </p>
            <p>{item.body}</p>
          </li>
        )
      })}
    </ul>
  )
}
