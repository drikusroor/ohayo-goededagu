import type {
  QueryResolvers,
  Role,
  UpdateUserPasswordInput,
  UserRelationResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'

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

export const usersWithPosts: QueryResolvers['usersWithPosts'] = () => {
  return db.user.findMany({
    where: {
      posts: {
        some: {},
      },
    },
  })
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const updateUser = ({ id, input }) => {
  if (!context.currentUser) {
    throw new Error('User not authenticated')
  }

  const { email } = input

  if (
    !context.currentUser.roles.includes('ADMIN') &&
    !context.currentUser.roles.includes('MODERATOR') &&
    context.currentUser.id !== id
  ) {
    throw new Error('User not authorized')
  }

  return db.user.update({
    data: {
      email,
    },
    where: { id },
  })
}

export const updateUserProfile = ({ input }) => {
  if (!context.currentUser) {
    throw new Error('User not authenticated')
  }

  const id = context.currentUser.id

  return db.profile.upsert({
    create: {
      ...input,
      user: {
        connect: {
          id,
        },
      },
    },
    update: {
      ...input,
    },
    where: {
      userId: id,
    },
  })
}

export const deleteUser = async ({ id }) => {
  if (!context.currentUser) {
    throw new Error('User not authenticated')
  }

  if (
    !context.currentUser.roles.includes('ADMIN') &&
    !context.currentUser.roles.includes('MODERATOR')
  ) {
    throw new Error('User not authorized')
  }

  const user = await db.user.findUnique({
    where: { id },
  })

  if (!user) {
    throw new Error('User not found')
  }

  if (user.roles.includes('ADMIN') && user.id === context.currentUser.id) {
    throw new Error('User not authorized')
  }

  return db.user.delete({
    where: { id },
  })
}

export const updateUserRoles = async ({ input }) => {
  if (!context.currentUser) {
    throw new Error('User not authenticated')
  }

  if (
    !context.currentUser.roles.includes('ADMIN') &&
    !context.currentUser.roles.includes('MODERATOR')
  ) {
    throw new Error('User not authorized')
  }

  const user = await db.user.findUnique({
    where: { id: input.id },
  })

  if (!user) {
    throw new Error('User not found')
  }

  if (
    user.roles.includes('ADMIN') &&
    !input.roles.includes('ADMIN') &&
    user.id === context.currentUser.id
  ) {
    throw new Error('User not authorized')
  }

  return db.user.update({
    data: {
      roles: input.roles,
    },
    where: { id: input.id },
  })
}

export const updateUserPassword = async ({
  input,
}: {
  input: UpdateUserPasswordInput
}) => {
  if (!context.currentUser) {
    throw 'User not authenticated'
  }

  const { currentPassword, newPassword, confirmNewPassword } = input

  const user = await db.user.findUnique({
    where: { id: context.currentUser.id },
  })

  validate(user, {
    presence: {
      allowEmpty: false,
      message: 'User/Password combination is incorrect',
    },
  })

  validate(user.hashedPassword, {
    presence: {
      allowEmpty: false,
      message: 'User/Password combination is incorrect',
    },
  })

  const [hashedCurrentPassword] = hashPassword(currentPassword, user.salt)

  validate(hashedCurrentPassword, {
    custom: {
      with: () => {
        if (hashedCurrentPassword !== user.hashedPassword) {
          throw 'Current password is incorrect'
        }
      },
      message: 'User/Password combination is incorrect',
    },
  })

  const confirmIsValid = confirmNewPassword === newPassword

  validate(confirmIsValid, {
    custom: {
      with: () => {
        if (!confirmIsValid) {
          throw 'New passwords do not match'
        }
      },
      message: 'New passwords do not match',
    },
  })

  const [newHashedPassword, newSalt] = hashPassword(newPassword)

  return db.user.update({
    data: {
      hashedPassword: newHashedPassword,
      salt: newSalt,
    },
    where: { id: context.currentUser.id },
  })
}

export const updateUserPasswordByAdmin = async ({
  id,
  newPassword,
  superAdminCode,
}) => {
  if (!context.currentUser) {
    throw new Error('User not authenticated')
  }

  if (!context.currentUser.roles.includes('ADMIN')) {
    throw new Error('User not authorized')
  }

  if (!superAdminCode || superAdminCode !== process.env.SUPER_ADMIN_CODE) {
    throw new Error('Super admin code is incorrect')
  }

  const user = await db.user.findUnique({
    where: { id },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const [hashedPassword, salt] = hashPassword(newPassword)

  return db.user.update({
    data: {
      hashedPassword,
      salt,
    },
    where: { id },
  })
}

export const emailUser = async () => {
  const user = await db.user.findUnique({
    where: { id: context.currentUser.id },
  })

  if (!user) {
    throw new Error('User not found')
  }

  const userEmailAddress = user?.email

  if (!userEmailAddress) {
    throw new Error('User email address not found')
  }

  console.log('Sending email to:', userEmailAddress)

  await sendEmail({
    to: user.email,
    subject: 'Test email',
    text: 'This is a test email',
    html: '<p>This is a test email</p>',
  })

  return user
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
  userSubscriptions: (_obj, { root }) => {
    return db.userSubscription.findMany({
      where: { userId: root?.id },
    })
  },
}
