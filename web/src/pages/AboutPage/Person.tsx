import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

interface Props {
  name: string
  quote: string
  story: string
  imgSrc: string
}

const Person = ({ name, imgSrc, quote, story }: Props) => {
  return (
    <>
      <MetaTags title="Person" description="About person" />

      <div className="flex flex-row gap-8 rounded border-2 p-2">
        <img alt={name} src={imgSrc} className="rounded-full" />
        <div>
          <h2 className="h2"> {name} </h2>
          <h3 className="font-light italic"> {quote} </h3>
          <p className="pt-2"> {story} </p>
        </div>
      </div>
    </>
  )
}

export default Person
