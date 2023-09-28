import { emailFooter, emailFooterAsText } from './footer'
import { getEmailHeader, getEmailHeaderAsText } from './header'

export function wrapBody(user, body) {
  return `${getEmailHeader(user)}\n\n${body}\n\n${emailFooter}`
}

export function wrapBodyAsText(user, body) {
  return `${getEmailHeaderAsText(user)}\n\n${body}\n\n${emailFooterAsText}`
}
