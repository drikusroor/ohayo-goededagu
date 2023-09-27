import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import EditAccountCell from 'src/components/EditAccountCell'

const EditAccountPage = () => {
  const { currentUser } = useAuth()

  const userId = currentUser.id

  return (
    <>
      <MetaTags
        title="Account instellingen"
        description="Account instellingen pagina"
      />

      <EditAccountCell id={userId} />
    </>
  )
}

export default EditAccountPage
