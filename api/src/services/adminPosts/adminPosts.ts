import { ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const adminPosts = () => {
  return db.post.findMany({ where: { userId: context.currentUser.id } })
}

export const adminPost = ({ id }) => {
  return db.post.findFirst({
    where: { id, userId: context.currentUser.id },
  })
}

export const createPost = async ({ input }) => {
  const { videoPost, ...postInput } = input

  const created = await db.post.create({
    data: { ...postInput, userId: context.currentUser.id },
  })

  if (postInput.type === 'VIDEO' && videoPost) {
    await db.videoPost.create({
      data: { ...videoPost, postId: created.id },
    })
  }

  return created
}

export const updatePost = async ({ id, input }) => {
  const { videoPost, ...postInput } = input

  const post = await db.post.findUnique({ where: { id } })

  if (!post) {
    throw new Error(`Post with ID ${id} not found`)
  }

  await verifyOwnership(post)

  const updated = await db.post.update({
    data: postInput,
    where: { id },
  })

  if (postInput.type === 'VIDEO' && videoPost) {
    await db.videoPost.upsert({
      where: { postId: id },
      create: { ...videoPost, postId: id },
      update: videoPost,
    })
  }

  return updated
}

export const deletePost = async ({ id }) => {
  const post = await db.post.findUnique({ where: { id } })

  if (!post) {
    throw new Error(`Post with ID ${id} not found`)
  }

  await verifyOwnership(post)

  return db.post.delete({
    where: { id },
  })
}

const verifyOwnership = async ({ id }) => {
  if (await adminPost({ id })) {
    return true
  } else {
    throw new ForbiddenError("You don't have access to this post")
  }
}
