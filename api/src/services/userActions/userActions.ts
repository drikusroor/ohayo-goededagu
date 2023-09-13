import type {
  QueryResolvers,
  MutationResolvers,
  UserActionRelationResolvers,
  UserActionOrderByInput,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const userActions: QueryResolvers['userActions'] = (
  {
    orderBy,
  }: {
    orderBy: UserActionOrderByInput
  } = { orderBy: { createdAt: 'asc' } }
) => {
  return db.userAction.findMany({
    orderBy,
  })
}

export const userAction: QueryResolvers['userAction'] = ({ id }) => {
  return db.userAction.findUnique({
    where: { id },
  })
}

export const createUserAction: MutationResolvers['createUserAction'] = ({
  input,
}) => {
  return db.userAction.create({
    data: input,
  })
}

export const updateUserAction: MutationResolvers['updateUserAction'] = ({
  id,
  input,
}) => {
  return db.userAction.update({
    data: input,
    where: { id },
  })
}

export const deleteUserAction: MutationResolvers['deleteUserAction'] = ({
  id,
}) => {
  return db.userAction.delete({
    where: { id },
  })
}

export const UserAction: UserActionRelationResolvers = {
  user: (_obj, { root }) => {
    return db.userAction.findUnique({ where: { id: root?.id } }).user()
  },
}
