import EditThumbCell from 'src/components/Thumb/EditThumbCell'

type ThumbPageProps = {
  id: number
}

const EditThumbPage = ({ id }: ThumbPageProps) => {
  return <EditThumbCell id={id} />
}

export default EditThumbPage
