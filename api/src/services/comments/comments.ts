import type {
  QueryResolvers,
  MutationResolvers,
  CommentRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const comments: QueryResolvers['comments'] = () => {
  return db.comment.findMany()
}

export const comment: QueryResolvers['comment'] = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const createComment: MutationResolvers['createComment'] = async ({
  input,
}) => {
  console.log('createComment input: ', input)

  if (!input.postId) {
    throw new Error('Post ID is required for Comment')
  }

  if (input.parentId) {
    const parentComment = await db.comment.findUnique({
      where: { id: input.parentId },
    })

    // check if post id is the same as parent post id
    if (parentComment && parentComment.postId !== input.postId) {
      throw new Error('Post ID does not match parent post ID')
    }

    // if parent already has a parent, throw error
    if (parentComment && parentComment.parentId) {
      throw new Error('Parent comment cannot have a parent')
    }
  }

  return db.comment.create({
    data: {
      ...input,
      userId: context.currentUser.id,
    },
  })
}

export const updateComment: MutationResolvers['updateComment'] = ({
  id,
  input,
}) => {
  throw new Error('Not implemented')
}

export const deleteComment: MutationResolvers['deleteComment'] = ({ id }) => {
  return db.comment.delete({
    where: { id },
  })
}

export const Comment: CommentRelationResolvers = {
  user: (_obj, { root }) => {
    return db.comment.findUnique({ where: { id: root?.id } }).user()
  },
  post: (_obj, { root }) => {
    return db.comment.findUnique({ where: { id: root?.id } }).post()
  },
  parent: (_obj, { root }) => {
    return db.comment.findUnique({ where: { id: root?.id } }).parent()
  },
  children: (_obj, { root }) => {
    return db.comment.findUnique({ where: { id: root?.id } }).children()
  },
  thumbs: (_obj, { root }) => {
    return db.comment.findUnique({ where: { id: root?.id } }).thumbs()
  },
}
