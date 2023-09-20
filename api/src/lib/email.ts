import * as nodemailer from 'nodemailer'
import './sentry'

interface Options {
  to: string | string[]
  subject: string
  text: string
  html: string
}

export async function sendEmail({ to, subject, text, html }: Options) {
  console.log('Sending email to:', to)

  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@ohayo-goededagu.nl',
      pass: process.env.SEND_IN_BLUE_KEY,
    },
  })

  const info = await transporter.sendMail({
    from: '"Ohayo Goededagu" <info@ohayo-goededagu.nl>',
    to: Array.isArray(to) ? to : [to], // list of receivers
    subject,
    text,
    html,
  })

  return info
}
