import * as nodemailer from 'nodemailer'

interface Options {
  to: string | string[]
  subject: string
  text: string
  html: string
}

export async function sendEmail({ to, subject, text, html }: Options) {
  console.log('Sending email to:', to)

  const isDev = process.env.NODE_ENV === 'development'

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@ohayo-goededagu.nl',
      pass: process.env.SEND_IN_BLUE_KEY,
    },
  })

  const from = isDev
    ? '"[DEV] Ohayo Goededagu" <info@ohayo-goededagu.nl>'
    : '"Ohayo Goededagu" <info@ohayo-goededagu.nl>'

  // Override the to address in development
  if (isDev) {
    if (process.env.EMAIL_OVERRIDE) {
      to = process.env.EMAIL_OVERRIDE
    } else {
      to = 'drikusroor@gmail.com'
    }

    subject = `[DEV]

    ${subject}

    [DEV]`
  }

  const info = await transporter.sendMail({
    from,
    to: Array.isArray(to) ? to : [to], // list of receivers
    subject,
    text,
    html,
  })

  return info
}
