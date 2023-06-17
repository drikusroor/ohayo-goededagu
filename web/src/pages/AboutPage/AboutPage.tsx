import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import Person from './Person'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />
      <div className="flex flex-col gap-4">
        <Person
          name="Adriana"
          quote="えーどりあな"
          story="Insert story about yourself here"
          imgSrc="https://media.licdn.com/dms/image/D4E03AQErJ1uyanV3Hg/profile-displayphoto-shrink_200_200/0/1685713399087?e=1692230400&v=beta&t=SEH4cQD6g_GpZU3_RdsGtfFJDSCo8-CH2diebHYmhmQ"
        />
        <Person
          name="Drikus"
          quote="でりきゅす"
          story="Insert story about yourself here"
          imgSrc="https://media.licdn.com/dms/image/C5103AQHkxnu-n6NYiA/profile-displayphoto-shrink_200_200/0/1516502659343?e=1692230400&v=beta&t=7eEwKYJM42COcuBj26-nIozkz9-W_g2unvNUO7DSes4"
        />
        <Person
          name="Emiel"
          quote="えみえる"
          story="Insert story about yourself here"
          imgSrc="https://media.licdn.com/dms/image/C4D03AQGvOoeJZ0a-qA/profile-displayphoto-shrink_200_200/0/1539081370762?e=1692230400&v=beta&t=KBHnuC3rUoYG_HRSYEPDheNxUXi-fMBA3sEHQHS1k4Y"
        />
        <Person
          name="Naomi"
          quote="なおみ"
          story="Insert story about yourself here"
          imgSrc="https://media.licdn.com/dms/image/C4E03AQGo8fhfk5rVFw/profile-displayphoto-shrink_200_200/0/1655802492416?e=1692230400&v=beta&t=U2T2f80eD_rulDRz9Wgv2Ceyia_afSpXO-AdoHQL5Pk"
        />
        <Person
          name="Robert"
          quote="ろばーと"
          story="Insert story about yourself here"
          imgSrc="https://media.licdn.com/dms/image/C4D03AQFrTR-UegzfRg/profile-displayphoto-shrink_200_200/0/1631110760665?e=1692230400&v=beta&t=xLoPP1LSYGN73DivvzDw2Opmng95yv83HfSlX8Skk1Q"
        />
      </div>
    </>
  )
}

export default AboutPage
