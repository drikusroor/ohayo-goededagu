import { navigate, routes } from '@redwoodjs/router'
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
        <div
          onClick={() => (id ? navigate(routes.viewProfile({ id: id })) : '#')}
          onKeyDown={() =>
            id ? navigate(routes.viewProfile({ id: id })) : '#'
          }
          tabIndex={0}
          role="button"
          key={id}
        >
          <Person
            key={id}
            id={id}
            profile={profile}
            style="cursor-pointer hover:border-black"
          />
        </div>
      ))}
    </div>
  )
}

export default Reisgenootschap
