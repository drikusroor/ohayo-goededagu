import type {
  QueryResolvers,
  MutationResolvers,
  ProfileRelationResolvers,
} from 'types/graphql'

import { ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const profiles: QueryResolvers['profiles'] = () => {
  return db.profile.findMany()
}

export const profile: QueryResolvers['profile'] = ({ id }) => {
  return db.profile.findUnique({
    where: { id },
  })
}

export const profileSelf: QueryResolvers['profileSelf'] = () => {
  return db.profile.findUnique({ where: { userId: context.currentUser.id } })
}

export const createProfile: MutationResolvers['createProfile'] = ({
  input,
}) => {
  const userId = context.currentUser?.id

  return db.profile.create({
    data: {
      ...input,
      user: { connect: { id: userId } },
    },
  })
}

export const updateProfile: MutationResolvers['updateProfile'] = async ({
  input,
}) => {
  const userId = context.currentUser?.id

  if (!userId) {
    throw new Error('You must be logged in to update your profile')
  }

  const profile = await db.profile.findUnique({ where: { userId } })

  if (!profile) {
    throw new Error(`Profile for user not found`)
  }

  return db.profile.update({
    data: input,
    where: { userId },
  })
}

export const Profile: ProfileRelationResolvers = {
  user: (_obj, { root }) => {
    return db.profile.findUnique({ where: { id: root?.id } }).user()
  },
}
