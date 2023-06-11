import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = () => {

  if (!context.currentUser) {
    throw new Error('You must be logged in to do this')
  }

  const id = context.currentUser?.id

  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ input }) => {

  if (!context.currentUser) {
    throw new Error('You must be logged in to do this')
  }

  const id = context.currentUser?.id

  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = () => {

  if (!context.currentUser) {
    throw new Error('You must be logged in to do this')
  }

  const id = context.currentUser?.id

  return db.user.delete({
    where: { id },
  })
}
