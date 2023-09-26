import { Post } from 'types/graphql'

import { db } from 'src/lib/db'

async function notifyUsersOfPublishedPost(postId: number) {
  const post = db.post.findUnique({
    where: { id: postId },
    include: { user: { include: { profile: true } } },
  })

  const { id, title, user } = post

  // actually send the email here

  await db.post.update({
    data: { emailSent: true },
    where: { id },
  })
}

export default notifyUsersOfPublishedPost
