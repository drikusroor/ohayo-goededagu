import EditProfileCell from 'src/components/Profile/EditProfileCell'

type ProfilePageProps = {
  id: number
}

const EditProfilePage = ({ id }: ProfilePageProps) => {
  return <EditProfileCell id={id} />
}

export default EditProfilePage
