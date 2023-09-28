import { getUserName } from 'src/functions/get-user-name'

export function getEmailHeader(user) {
  return `<p>Beste ${getUserName(user)},</p>`
}

export function getEmailHeaderAsText(user) {
  return `Beste ${getUserName(user)},`
}
