interface Props {
  name: string
  quote: string
  story: string
  imgSrc: string
}

const Person = ({ name, imgSrc, quote, story }: Props) => {
  return (
    <div className="flex flex-row gap-8 rounded border-2 p-2">
      <img
        alt={`Foto van ${name}`}
        src={imgSrc}
        className="h-48 w-48 items-center justify-center rounded-full bg-slate-300 object-cover"
        loading="lazy"
        width="200"
        height="200"
      />
      <div>
        <h2 className="h2"> {name} </h2>
        <h3 className="font-light italic"> {quote} </h3>
        <p className="pt-2"> {story} </p>
      </div>
    </div>
  )
}

export default Person
