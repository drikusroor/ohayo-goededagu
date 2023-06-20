import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import EditAccountCell from 'src/components/EditAccountCell'

const EditAccountPage = () => {
  const { currentUser } = useAuth()

  const userId = currentUser.id

  return (
    <>
      <MetaTags title="Edit Account" description="Edit Account page" />

      <EditAccountCell id={userId} />
    </>
  )
}

export default EditAccountPage
