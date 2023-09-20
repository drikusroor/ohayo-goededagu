import type {
  QueryResolvers,
  MutationResolvers,
  ImageGalleryImageRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const imageGalleryImages: QueryResolvers['imageGalleryImages'] = () => {
  return db.imageGalleryImage.findMany()
}

export const imageGalleryImage: QueryResolvers['imageGalleryImage'] = ({
  id,
}) => {
  return db.imageGalleryImage.findUnique({
    where: { id },
  })
}

export const createImageGalleryImage: MutationResolvers['createImageGalleryImage'] =
  ({ input }) => {
    return db.imageGalleryImage.create({
      data: input,
    })
  }

export const updateImageGalleryImage: MutationResolvers['updateImageGalleryImage'] =
  ({ id, input }) => {
    return db.imageGalleryImage.update({
      data: input,
      where: { id },
    })
  }

export const addImageGalleryImagesToImageGallery: MutationResolvers['addImageGalleryImagesToImageGallery'] =
  async ({ id, images }) => {
    const imageGallery = await db.imageGallery.findUnique({
      where: { id },
    })

    if (!imageGallery) {
      throw new Error('ImageGallery not found')
    }

    await db.imageGalleryImage.createMany({
      data: images.map((image) => ({
        ...image,
        imageGalleryId: imageGallery.id,
      })),
    })

    return db.imageGalleryImage.findMany({
      where: { imageGalleryId: imageGallery.id },
    })
  }

export const deleteImageGalleryImage: MutationResolvers['deleteImageGalleryImage'] =
  async ({ id }) => {
    const imageGalleryImage = await db.imageGalleryImage.findUnique({
      where: { id },
    })

    if (!imageGalleryImage) {
      throw new Error('ImageGalleryImage not found')
    }

    await db.imageGalleryImage.delete({
      where: { id },
    })

    return imageGalleryImage
  }

export const ImageGalleryImage: ImageGalleryImageRelationResolvers = {
  imageGallery: (_obj, { root }) => {
    return db.imageGalleryImage
      .findUnique({ where: { id: root?.id } })
      .imageGallery()
  },
}
