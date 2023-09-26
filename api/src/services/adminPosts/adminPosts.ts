import { ForbiddenError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

import upsertImageGalleriesOnPost from './helpers/upsert-image-galleries-on-post'

export const adminPosts = () => {
  return db.post.findMany({ where: { userId: context.currentUser.id } })
}

export const adminPost = ({ id }) => {
  return db.post.findFirst({
    where: { id, userId: context.currentUser.id },
  })
}

export const createPost = async ({ input }) => {
  const { imageGalleries = [], coverImage, videoPost, ...postInput } = input

  const created = await db.post.create({
    data: { ...postInput, userId: context.currentUser.id },
  })

  if (postInput.type === 'VIDEO' && videoPost) {
    await db.videoPost.create({
      data: { ...videoPost, postId: created.id },
    })
  }

  if (coverImage) {
    await upsertCoverImage(created.id, coverImage)
  }

  if (imageGalleries.length > 0) {
    upsertImageGalleriesOnPost(created.id, imageGalleries)
  }

  const shouldSendEmail = postInput.published

  // TODO: Send email
  if (shouldSendEmail) {
    console.log('Send email')

    await db.post.update({
      data: { emailSent: true },
      where: { id: created.id },
    })
  }

  return created
}

export const updatePost = async ({ id, input }) => {
  const { imageGalleries = [], videoPost, coverImage, ...postInput } = input

  const post = await db.post.findUnique({ where: { id } })

  if (!post) {
    throw new Error(`Post with ID ${id} not found`)
  }

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

  if (coverImage) {
    await upsertCoverImage(id, coverImage)
  }

  if (imageGalleries.length > 0) {
    upsertImageGalleriesOnPost(id, imageGalleries)
  }

  const shouldSendEmail = !post.emailSent && postInput.published

  // TODO: Send email
  if (shouldSendEmail) {
    console.log('Send email')

    await db.post.update({
      data: { emailSent: true },
      where: { id },
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

export const upsertCoverImage = async (postId, coverImage) => {
  const upsertedCoverImage = coverImage.id
    ? await db.image.update({
        data: { ...coverImage, postId },
        where: { id: coverImage.id },
      })
    : await db.image.create({
        data: { ...coverImage, postId },
      })

  await db.post.update({
    data: { coverImageId: upsertedCoverImage.id },
    where: { id: postId },
  })

  return upsertedCoverImage
}

const verifyOwnership = async ({ id }) => {
  if (await adminPost({ id })) {
    return true
  } else {
    throw new ForbiddenError("You don't have access to this post")
  }
}
