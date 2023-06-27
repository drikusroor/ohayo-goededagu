import { MetaTags } from '@redwoodjs/web'

import { Role } from 'src/types/role'

import ReisgenootschapCell from '../../components/ReisgenootschapCell'

const reisgenootschapRoles = [Role.ADMIN, Role.MODERATOR]

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />
      <ReisgenootschapCell roles={reisgenootschapRoles} />
    </>
  )
}

export default AboutPage
