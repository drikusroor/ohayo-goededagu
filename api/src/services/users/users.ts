import type { QueryResolvers, Role, UserRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const usersWithRoles: QueryResolvers['usersWithRoles'] = ({ roles }) => {
  return db.user.findMany({
    where: {
      roles: {
        hasSome: roles as Role[],
      },
    },
    orderBy: {
      name: 'asc',
    },
  })
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const updateUserProfile = ({ input }) => {
  if (!context.currentUser) {
    throw new Error('User not authenticated')
  }

  const id = context.currentUser.id

  return db.user.update({
    data: input,
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  posts: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).posts()
  },
  profile: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).profile()
  },
  thumbs: (_obj, { root }) => {
    return db.user.findMany({ where: { id: root?.id } }).thumbs()
  },
}
