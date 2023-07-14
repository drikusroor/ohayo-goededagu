import { PostRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const posts = () => {
  return db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  })
}

export const post = ({ id }) => {
  return db.post.findUnique({
    where: { id },
  })
}

export const Post: PostRelationResolvers = {
  user: (_obj, { root }) => db.user.findFirst({ where: { id: root.userId } }),
  comments: (_obj, { root }) => {
    return db.comment.findMany({ where: { postId: root?.id, deleted: false } })
  },
  videoPost: (_obj, { root }) => {
    if (root.type === 'VIDEO') {
      return db.videoPost.findFirst({ where: { postId: root?.id } })
    }
    return null
  },
  coverImage: (_obj, { root }) => {
    if (root.type === 'ARTICLE') {
      return db.image.findFirst({ where: { postId: root?.id } })
    }
    return null
  },
}
