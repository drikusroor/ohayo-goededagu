import { MetaTags } from '@redwoodjs/web'

import { Role } from 'src/types/role'

import Adriana from '../../../../web/public/images/Adriana.jpg'
import Drikus from '../../../../web/public/images/Drikus.jpg'
import Emiel from '../../../../web/public/images/Emiel.jpg'
import Naomi from '../../../../web/public/images/Naomi.jpg'
import Robert from '../../../../web/public/images/Robert.jpg'
import ReisgenootschapCell from '../../components/ReisgenootschapCell'

import Person from './Person'

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
