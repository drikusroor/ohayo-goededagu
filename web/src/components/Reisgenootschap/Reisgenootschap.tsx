import { MetaTags } from '@redwoodjs/web'

import Person from 'src/pages/AboutPage/Person'

interface IReisgenootschap {
  id: number
  name: string
  profile: {
    avatar: string
    bio: string
    name: string
    japaneseName: string
  }
}

interface IReisgenootschapProps {
  reisgenootschap: IReisgenootschap[]
}

const Reisgenootschap = ({ reisgenootschap = [] }: IReisgenootschapProps) => {
  ;<MetaTags title="Reisgenootschap" description="Reisgenootschap" />

  return (
    <div className="grid gap-4 p-3 md:grid-cols-2 md:p-10">
      {reisgenootschap.map(({ id, profile }) => (
        <Person
          key={id}
          name={profile?.name}
          quote={profile?.japaneseName}
          story={profile?.bio}
          imgSrc={profile?.avatar}
        />
      ))}
    </div>
  )
}

export default Reisgenootschap
