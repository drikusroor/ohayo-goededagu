import { MetaTags } from '@redwoodjs/web'

import UserModerationCell from 'src/components/UserModerationCell'

const UserModerationPage = () => {
  return (
    <>
      <MetaTags title="UserModeration" description="UserModeration page" />

      <UserModerationCell />
    </>
  )
}

export default UserModerationPage
