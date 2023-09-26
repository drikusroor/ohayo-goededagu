import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import UserSubscriptionsCell from 'src/components/UserSubscriptionsCell'

const EmailSettingsPage = () => {
  const { currentUser } = useAuth()
  const { id } = currentUser

  return (
    <>
      <MetaTags title="EmailSettings" description="EmailSettings page" />

      <h1>Hou mij op de hoogte met e-mail notificaties</h1>

      <UserSubscriptionsCell id={id} />
    </>
  )
}

export default EmailSettingsPage
