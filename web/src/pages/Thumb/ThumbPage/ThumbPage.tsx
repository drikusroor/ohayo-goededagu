import ThumbCell from 'src/components/Thumb/ThumbCell'

type ThumbPageProps = {
  id: number
}

const ThumbPage = ({ id }: ThumbPageProps) => {
  return <ThumbCell id={id} />
}

export default ThumbPage
