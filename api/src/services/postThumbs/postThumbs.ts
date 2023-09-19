import type {
  QueryResolvers,
  MutationResolvers,
  PostThumbRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const postThumbs: QueryResolvers['postThumbs'] = () => {
  return db.postThumb.findMany()
}

export const postThumb: QueryResolvers['postThumb'] = ({ id }) => {
  return db.postThumb.findUnique({
    where: { id },
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
