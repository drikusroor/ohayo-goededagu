import { PostRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const posts = async ({ input }: { input: QueryPostsInput }) => {
  const {
    page = 1,
    perPage = 10,
    authors = [],
    postTypes = [],
    from = null,
    to = null,
  } = input

  let where = {
    published: true,
  }

  if (authors.length > 0) {
    where = {
      ...where,
      userId: { in: authors },
    }
  }

  if (postTypes.length > 0) {
    where = {
      ...where,
      type: { in: postTypes },
    }
  }

  if (from && to) {
    where = {
      ...where,
      createdAt: { gte: from, lte: to },
    }
  } else if (from) {
    where = {
      ...where,
      createdAt: { gte: from },
    }
  } else if (to) {
    where = {
      ...where,
      createdAt: { lte: to },
    }
  }

  const result = await db.post.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip: (page - 1) * perPage,
    take: perPage,
  })

  const count = await db.post.count({ where })

  return {
    posts: result,
    count,
    page,
    perPage,
    activeFilters: [...authors, ...postTypes],
  }
}

export const allPosts = () => {
  return db.post.findMany({
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
  imageGalleries: (_obj, { root }) => {
    return db.imageGalleryOnPost.findMany({ where: { postId: root?.id } })
  },
  postThumbs: (_obj, { root }) => {
    return db.postThumb.findMany({ where: { postId: root?.id } })
  },
}
