import type {
  QueryResolvers,
  MutationResolvers,
  ThumbRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const thumbs: QueryResolvers['thumbs'] = () => {
  return db.thumb.findMany()
}

export const thumbsByCommentId: QueryResolvers['thumbsByCommentId'] = ({
  commentId,
}) => {
  return db.thumb.findMany({
    where: { commentId },
  })
}

export const thumb: QueryResolvers['thumb'] = ({ id }) => {
  return db.thumb.findUnique({
    where: { id },
  })
}

export const createUpdateOrDeleteThumb: MutationResolvers['createUpdateOrDeleteThumb'] =
  async ({ input }) => {
    const { up } = input

    // check if user has already thumbed this comment
    const userId = context.currentUser.id

    const thumb = await db.thumb.findFirst({
      where: { userId, commentId: input.commentId },
    })

    // if not exists, create a new thumb
    if (!thumb) {
      return db.thumb.create({
        data: { ...input, userId },
      })
    }

    // if not same, update the thumb
    if (thumb.up !== up) {
      return db.thumb.update({
        data: { ...input, userId },
        where: { id: thumb.id },
      })
    }
    // if exists, check if the thumb is the same
    // if same, delete the thumb
    return db.thumb.delete({
      where: { id: thumb.id },
    })
  }

export const createThumb: MutationResolvers['createThumb'] = ({ input }) => {
  return db.thumb.create({
    data: input,
  })
}

export const updateThumb: MutationResolvers['updateThumb'] = ({
  id,
  input,
}) => {
  return db.thumb.update({
    data: input,
    where: { id },
  })
}

export const deleteThumb: MutationResolvers['deleteThumb'] = ({ id }) => {
  return db.thumb.delete({
    where: { id },
  })
}

export const Thumb: ThumbRelationResolvers = {
  user: (_obj, { root }) => {
    return db.thumb.findUnique({ where: { id: root?.id } }).user()
  },
  comment: (_obj, { root }) => {
    return db.thumb.findUnique({ where: { id: root?.id } }).comment()
  },
}
