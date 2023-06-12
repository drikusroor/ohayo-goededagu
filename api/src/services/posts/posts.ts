import { db } from 'src/lib/db'

export const posts = () => {
  return db.post.findMany()
}

export const post = ({ id }) => {
  return db.post.findUnique({
    where: { id },
  })
}

export const Post = {
  user: (_obj, { root }) => db.user.findFirst({ where: { id: root.userId } }),
}
