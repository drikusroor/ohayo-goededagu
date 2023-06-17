import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Adriana from '../../../../web/public/images/Adriana.jpg'
import Drikus from '../../../../web/public/images/Drikus.jpg'
import Emiel from '../../../../web/public/images/Emiel.jpg'
import Naomi from '../../../../web/public/images/Naomi.jpg'
import Robert from '../../../../web/public/images/Robert.jpg'

import Person from './Person'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />
      <div className="grid gap-4 pb-4 md:grid-cols-2">
        <Person name="Adriana" quote="エイドリアナ" story="" imgSrc={Adriana} />
        <Person name="Drikus" quote="ドリキュス" story="" imgSrc={Drikus} />
        <Person name="Emiel" quote="エミエル" story="" imgSrc={Emiel} />
        <Person name="Naomi" quote="直美 なおみ" story="" imgSrc={Naomi} />
        <Person name="Robert" quote="ロバート" story="" imgSrc={Robert} />
      </div>
    </>
  )
}

export default AboutPage
