import Person from 'src/pages/AboutPage/Person'

interface IReisgenootschap {
  id: number
  name: string
  profile: {
    avatar: string
    bio: string
  }
}

interface IReisgenootschapProps {
  reisgenootschap: IReisgenootschap[]
}

const Reisgenootschap = ({ reisgenootschap = [] }: IReisgenootschapProps) => {
  {
    /* <div className="grid gap-4 pb-4 md:grid-cols-2">
        <Person name="Adriana" quote="エイドリアナ" story="" imgSrc={Adriana} />
        <Person name="Drikus" quote="ドリキュス" story="" imgSrc={Drikus} />
        <Person name="Emiel" quote="エミエル" story="" imgSrc={Emiel} />
        <Person name="Naomi" quote="直美 なおみ" story="" imgSrc={Naomi} />
        <Person name="Robert" quote="ロバート" story="" imgSrc={Robert} />
      </div> */
  }

  return (
    <div className="grid gap-4 pb-4 md:grid-cols-2">
      {reisgenootschap.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          quote=""
          story={person.profile?.bio}
          imgSrc={person.profile?.avatar}
        />
      ))}
    </div>
  )
}

export default Reisgenootschap
