import { BsArrowRightCircle } from 'react-icons/bs'

import { Link, routes } from '@redwoodjs/router'

interface Props {
  id?: number
  profile: object
  style?: string
}

const Person = ({ profile, id, style }: Props) => {
  return (
    <div
      className={`${style} flex flex-row justify-between gap-8 rounded border-2 p-2`}
    >
      <div className="flex flex-row gap-8">
        <img
          alt={`Foto van ${profile.name}`}
          key={id}
          src={profile.avatar}
          className="h-48 w-48 items-center justify-center rounded-full bg-slate-300 object-cover"
          loading="lazy"
          width="200"
          height="200"
        />
        <div>
          <Link
            to={id ? routes.viewProfile({ id: id }) : '#'}
            className="hover:underline"
            title={`View ${profile.name}'s profile`}
          >
            <h2 className="h2"> {profile.name} </h2>
          </Link>
          <h3 className="font-light italic"> {profile.japaneseName} </h3>
          <p className="pt-2"> {profile.bio} </p>
        </div>
      </div>

      {style && <BsArrowRightCircle className="text-3xl" />}
    </div>
  )
}

export default Person
