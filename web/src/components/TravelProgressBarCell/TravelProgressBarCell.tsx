import type {
  FindTravelProgressBarQuery,
  FindTravelProgressBarQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Skeleton from '../Skeleton/Skeleton'
import TravelProgressBar from '../TravelProgressBar/TravelProgressBar'

export const QUERY = gql`
  query FindTravelProgressBarQuery {
    allPosts {
      id
      title
      createdAt
      user {
        name
        profile {
          name
          avatar
        }
      }
    }
  }
`

export const Loading = () => (
  <Skeleton height={100} className="w-full rounded-l" />
)

export const Empty = () => (
  <div>Lol, dit is niet goed en heir ging iets faud.</div>
)

export const Failure = ({
  error,
}: CellFailureProps<FindTravelProgressBarQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  allPosts,
}: CellSuccessProps<
  FindTravelProgressBarQuery,
  FindTravelProgressBarQueryVariables
>) => {
  return <TravelProgressBar posts={allPosts} />
}
