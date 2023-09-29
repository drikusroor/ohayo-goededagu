import EditUserSubscriptionCell from 'src/components/UserSubscription/EditUserSubscriptionCell'

type UserSubscriptionPageProps = {
  id: number
}

const EditUserSubscriptionPage = ({ id }: UserSubscriptionPageProps) => {
  return <EditUserSubscriptionCell id={id} />
}

export default EditUserSubscriptionPage
