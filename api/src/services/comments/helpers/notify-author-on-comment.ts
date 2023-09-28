import { Comment } from 'types/graphql'

import { getUserName } from 'src/functions/get-user-name'
import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import { wrapBody, wrapBodyAsText } from 'src/lib/email/wrap'

async function notifyAuthorOnCommentIfSubscribed(comment: Comment) {
  // get comment post author
  const commentPostAuthor = await db.post
    .findUnique({
      where: { id: comment.postId },
    })
    .user({
      include: {
        userSubscriptions: {
          where: {
            type: 'COMMENT',
          },
        },
        profile: true,
      },
    })

  console.log(commentPostAuthor)

  if (commentPostAuthor?.userSubscriptions.some((s) => s.type === 'COMMENT')) {
    // send email to comment post author
    sendEmail({
      to: commentPostAuthor.email,
      subject: 'Iemand heeft gereageerd op je post',
      text: wrapBodyAsText(
        commentPostAuthor,
        `
        ${getUserName(
          context.currentUser
        )} heeft gereageerd op je post. Ga naar de post om de reactie te bekijken: https://ohayo-goededagu.nl/article/${
          comment.postId
        }#comment-${comment.id}
        `
      ),

      html: wrapBody(
        commentPostAuthor,
        `
        <p>${getUserName(
          context.currentUser
        )} heeft gereageerd op je post. Ga naar de post om de reactie te bekijken: <a href="https://ohayo-goededagu.nl/article/${
          comment.postId
        }#comment-${comment.id}">https://ohayo-goededagu.nl/article/${
          comment.postId
        }#comment-${comment.id}</a></p>
        `
      ),
    })
  }
}

export default notifyAuthorOnCommentIfSubscribed
