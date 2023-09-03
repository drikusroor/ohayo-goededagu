import type {
  QueryResolvers,
  MutationResolvers,
  ImageGalleryOnPostRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const imageGalleryOnPosts: QueryResolvers['imageGalleryOnPosts'] =
  () => {
    return db.imageGalleryOnPost.findMany()
  }

export const imageGalleryOnPost: QueryResolvers['imageGalleryOnPost'] = ({
  id,
}) => {
  return db.imageGalleryOnPost.findUnique({
    where: { id },
  })
}

export const createImageGalleryOnPost: MutationResolvers['createImageGalleryOnPost'] =
  ({ input }) => {
    return db.imageGalleryOnPost.create({
      data: input,
    })
  }

export const updateImageGalleryOnPost: MutationResolvers['updateImageGalleryOnPost'] =
  ({ id, input }) => {
    return db.imageGalleryOnPost.update({
      data: input,
      where: { id },
    })
  }

export const deleteImageGalleryOnPost: MutationResolvers['deleteImageGalleryOnPost'] =
  ({ id }) => {
    return db.imageGalleryOnPost.delete({
      where: { id },
    })
  }

export const ImageGalleryOnPost: ImageGalleryOnPostRelationResolvers = {
  imageGallery: (_obj, { root }) => {
    return db.imageGalleryOnPost
      .findUnique({ where: { id: root?.id } })
      .imageGallery()
  },
  post: (_obj, { root }) => {
    return db.imageGalleryOnPost.findUnique({ where: { id: root?.id } }).post()
  },
}
