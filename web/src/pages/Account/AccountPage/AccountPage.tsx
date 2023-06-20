import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import AccountCell from 'src/components/AccountCell'

const AccountPage = () => {
  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Account" description="Account page" />

      {currentUser && <AccountCell id={currentUser.id} />}
    </>
  )
}

export default AccountPage
