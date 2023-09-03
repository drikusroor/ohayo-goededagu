import { MetaTags } from '@redwoodjs/web'

import UserModerationCell from 'src/components/UserModerationCell'

const UserModerationPage = () => {
  return (
    <>
      <MetaTags title="UserModeration" description="UserModeration page" />

      <h1>Moderate Users</h1>
      <UserModerationCell />
    </>
  )
}

export default UserModerationPage
