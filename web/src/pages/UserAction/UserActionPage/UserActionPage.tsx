import UserActionCell from 'src/components/UserAction/UserActionCell'

type UserActionPageProps = {
  id: number
}

const UserActionPage = ({ id }: UserActionPageProps) => {
  return <UserActionCell id={id} />
}

export default UserActionPage
