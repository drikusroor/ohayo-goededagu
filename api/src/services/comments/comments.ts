import type {
  QueryResolvers,
  MutationResolvers,
  CommentRelationResolvers,
  CommentOrderByInput,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const comments: QueryResolvers['comments'] = ({
  orderBy,
}: {
  orderBy: CommentOrderByInput
}) => {
  return db.comment.findMany({
    orderBy,
  })
}

export const comment: QueryResolvers['comment'] = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const createComment: MutationResolvers['createComment'] = ({
  input,
}) => {
  return db.comment.create({
    data: input,
  })
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
