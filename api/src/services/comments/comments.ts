import type {
  QueryResolvers,
  MutationResolvers,
  CommentRelationResolvers,
  CommentOrderByInput,
  Comment,
} from 'types/graphql'

import { db } from 'src/lib/db'

import notifyAuthorOnCommentIfSubscribed from './helpers/notify-author-on-comment'
import notifyUserOnCommentReplyIfSubscribed from './helpers/notify-user-on-comment-reply'

export const comments: QueryResolvers['comments'] = (
  {
    orderBy,
  }: {
    orderBy: CommentOrderByInput
  } = { orderBy: { createdAt: 'asc' } }
) => {
  return db.comment.findMany({
    orderBy,
  })
}

export const comment: QueryResolvers['comment'] = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const createComment: MutationResolvers['createComment'] = async ({
  input,
}) => {
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
  }

  const created = await db.comment.create({
    data: {
      ...input,
      userId: context.currentUser.id,
    },
  })

  // send email to parent comment author if they have a subscription to comment replies
  await notifyUserOnCommentReplyIfSubscribed(created as Comment)

  // send email to post author if they have a subscription to comments
  await notifyAuthorOnCommentIfSubscribed(created as Comment)

  return created
}

export const updateComment: MutationResolvers['updateComment'] = ({
  id,
  input,
}) => {
  return db.comment.update({
    data: input,
    where: { id },
  })
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
