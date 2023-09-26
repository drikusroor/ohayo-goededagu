import type {
  QueryResolvers,
  MutationResolvers,
  UserSubscriptionRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userSubscriptions: QueryResolvers['userSubscriptions'] = () => {
  return db.userSubscription.findMany()
}

export const userSubscription: QueryResolvers['userSubscription'] = ({
  id,
}) => {
  return db.userSubscription.findUnique({
    where: { id },
  })
}

export const createUserSubscription: MutationResolvers['createUserSubscription'] =
  ({ input }) => {
    return db.userSubscription.create({
      data: input,
    })
  }

export const updateUserSubscription: MutationResolvers['updateUserSubscription'] =
  ({ id, input }) => {
    return db.userSubscription.update({
      data: input,
      where: { id },
    })
  }

export const deleteUserSubscription: MutationResolvers['deleteUserSubscription'] =
  ({ id }) => {
    return db.userSubscription.delete({
      where: { id },
    })
  }

export const UserSubscription: UserSubscriptionRelationResolvers = {
  user: (_obj, { root }) => {
    return db.userSubscription.findUnique({ where: { id: root?.id } }).user()
  },
}
