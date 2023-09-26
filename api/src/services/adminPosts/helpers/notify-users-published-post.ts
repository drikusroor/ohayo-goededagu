import { Post } from 'types/graphql'

import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import { emailFooter, emailFooterAsText } from 'src/lib/email/footer'

async function notifyUsersOfPublishedPost(postId: number) {
  const post = db.post.findUnique({
    where: { id: postId },
    include: { user: { include: { profile: true } } },
  })

  const { id, title, user } = post

  // get users who are subscribed to this author
  const users = await db.user.findMany({
    where: {
      userSubscriptions: {
        some: {
          type: 'POST_AUTHOR',
          target: user.id,
        },
      },
    },
  })

  // send email to each of the subscribed users
  Promise.all(
    users.map((subscribedUser) =>
      sendEmail({
        to: subscribedUser.email,
        subject: user.profile?.name
          ? `Nieuw artikel van ${user.profile.name} op Ohayo Goededagu`
          : `Nieuw artikel op Ohayo Goededagu`,
        text: `
          Beste ${subscribedUser.profile?.name ?? 'lezer'},
          Er is een nieuw artikel van ${
            user.profile?.name || 'een auteur'
          } op Ohayo Goededagu gepubliceerd: ${title}!
          ${emailFooterAsText}
        `,
        html: `
          <p>Beste ${subscribedUser.profile?.name ?? 'lezer'},</p>
          <p>Er is een nieuw artikel van ${
            user.profile?.name || 'een auteur'
          } op Ohayo Goededagu gepubliceerd: <a href="https://ohayo-goededagu.nl/article/${id}">${title}</a>!</p>

          ${emailFooter}
        `,
      })
    )
  )

  // update the post to indicate that the email has been sent to avoid sending it again
  await db.post.update({
    data: { emailSent: true },
    where: { id },
  })
}

export default notifyUsersOfPublishedPost
