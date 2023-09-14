import * as nodemailer from 'nodemailer'

interface Options {
  to: string | string[]
  subject: string
  text: string
  html: string
}

export async function sendEmail({ to, subject, text, html }: Options) {
  console.log('Sending email to:', to)

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secure: false,
    port: 587,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  const info = await transporter.sendMail({
    from: '"Ohayo Noreplyo" <noreply@ohayo-goededagu.nl>',
    to: Array.isArray(to) ? to : [to], // list of receivers
    subject,
    text,
    html,
  })

  return info
}
