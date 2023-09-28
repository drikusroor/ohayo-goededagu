import { Comment } from 'types/graphql'

import { getUserName } from 'src/functions/get-user-name'
import { db } from 'src/lib/db'
import { sendEmail } from 'src/lib/email'
import { emailFooter, emailFooterAsText } from 'src/lib/email/footer'
import { wrapBody, wrapBodyAsText } from 'src/lib/email/wrap'

async function notifyUserOnCommentReplyIfSubscribed(comment: Comment) {
  if (!comment.parentId) {
    return
  }

  // get parent comment author
  const parentCommentAuthor = await db.comment
    .findUnique({
      where: { id: comment.parentId },
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

  if (
    parentCommentAuthor?.userSubscriptions.some((s) => s.type === 'COMMENT')
  ) {
    // send email to parent comment author
    sendEmail({
      to: parentCommentAuthor.email,
      subject: 'Iemand heeft gereageerd op je comment',
      text: wrapBodyAsText(
        parentCommentAuthor,
        `
        ${getUserName(
          context.currentUser
        )} heeft gereageerd op je comment. Ga naar de post om de reactie te bekijken: https://ohayo-goededagu.nl/article/${
          comment.postId
        }#comment-${comment.id}
        `
      ),

      html: wrapBody(
        parentCommentAuthor,
        `
        <p>${getUserName(
          context.currentUser
        )} heeft gereageerd op je comment. Ga naar de post om de reactie te bekijken: <a href="https://ohayo-goededagu.nl/article/${
          comment.postId
        }#comment-${comment.id}">https://ohayo-goededagu.nl/article/${
          comment.postId
        }#comment-${comment.id}</a></p>
        `
      ),
    })
  }
}

export default notifyUserOnCommentReplyIfSubscribed
