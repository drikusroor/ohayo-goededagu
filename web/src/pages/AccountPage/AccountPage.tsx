import { MetaTags } from '@redwoodjs/web'
import { useAuth } from 'src/auth'
import AccountCell from 'src/components/AccountCell'

const AccountPage = () => {

  const { currentUser } = useAuth()

  return (
    <>
      <MetaTags title="Account" description="Account page" />

      <h1 className="text-3xl font-bold mb-4">My Account</h1>

      {currentUser && (
        <AccountCell id={currentUser.id} />
      )}
    </>
  )
}

export default AccountPage
