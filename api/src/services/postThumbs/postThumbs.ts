import type {
  QueryResolvers,
  MutationResolvers,
  PostThumbRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const postThumbs: QueryResolvers['postThumbs'] = () => {
  return db.postThumb.findMany()
}

export const postThumbsByPostId: QueryResolvers['postThumbsByPostId'] = ({
  postId,
}) => {
  return db.postThumb.findMany({
    where: { postId },
  })
}

export const postThumb: QueryResolvers['postThumb'] = ({ id }) => {
  return db.postThumb.findUnique({
    where: { id },
  })
}

export const createUpdateOrDeletePostThumb: MutationResolvers['createUpdateOrDeletePostThumb'] =
  async ({ input }) => {
    const { up } = input

    // check if user has already thumbed this post
    const userId = context.currentUser.id

    const postThumb = await db.postThumb.findFirst({
      where: { userId, postId: input.postId },
    })

    // if not exists, create a new thumb
    if (!postThumb) {
      return db.postThumb.create({
        data: { ...input, userId },
      })
    }

    // if not same, update the thumb
    if (postThumb.up !== up) {
      return db.postThumb.update({
        data: { ...input, userId },
        where: { id: postThumb.id },
      })
    }
    // if exists, check if the thumb is the same
    // if same, delete the thumb
    return db.postThumb.delete({
      where: { id: postThumb.id },
    })
  }

export const createPostThumb: MutationResolvers['createPostThumb'] = ({
  input,
}) => {
  return db.postThumb.create({
    data: input,
  })
}

export const updatePostThumb: MutationResolvers['updatePostThumb'] = ({
  id,
  input,
}) => {
  return db.postThumb.update({
    data: input,
    where: { id },
  })
}

export const deletePostThumb: MutationResolvers['deletePostThumb'] = ({
  id,
}) => {
  return db.postThumb.delete({
    where: { id },
  })
}

export const PostThumb: PostThumbRelationResolvers = {
  user: (_obj, { root }) => {
    return db.postThumb.findUnique({ where: { id: root?.id } }).user()
  },
  post: (_obj, { root }) => {
    return db.postThumb.findUnique({ where: { id: root?.id } }).post()
  },
}
