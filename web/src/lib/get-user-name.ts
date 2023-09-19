import { User } from 'types/graphql'

export function getUserName(user: User) {
  return user?.profile?.name || user?.email || 'Anon'
}
