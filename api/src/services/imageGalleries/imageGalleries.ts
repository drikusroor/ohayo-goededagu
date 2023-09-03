import type {
  QueryResolvers,
  MutationResolvers,
  ImageGalleryRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const imageGalleries: QueryResolvers['imageGalleries'] = () => {
  return db.imageGallery.findMany()
}

export const imageGallery: QueryResolvers['imageGallery'] = ({ id }) => {
  return db.imageGallery.findUnique({
    where: { id },
  })
}

export const createImageGallery: MutationResolvers['createImageGallery'] = ({
  input,
}) => {
  return db.imageGallery.create({
    data: input,
  })
}

export const updateImageGallery: MutationResolvers['updateImageGallery'] = ({
  id,
  input,
}) => {
  return db.imageGallery.update({
    data: input,
    where: { id },
  })
}

export const deleteImageGallery: MutationResolvers['deleteImageGallery'] = ({
  id,
}) => {
  return db.imageGallery.delete({
    where: { id },
  })
}

export const ImageGallery: ImageGalleryRelationResolvers = {
  ImageGalleryOnPost: (_obj, { root }) => {
    return db.imageGallery
      .findUnique({ where: { id: root?.id } })
      .ImageGalleryOnPost()
  },
}
