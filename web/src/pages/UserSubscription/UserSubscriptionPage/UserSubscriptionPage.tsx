import UserSubscriptionCell from 'src/components/UserSubscription/UserSubscriptionCell'

type UserSubscriptionPageProps = {
  id: number
}

const UserSubscriptionPage = ({ id }: UserSubscriptionPageProps) => {
  return <UserSubscriptionCell id={id} />
}

export default UserSubscriptionPage
