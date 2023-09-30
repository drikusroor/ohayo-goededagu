import { CheckboxField, Form, Label } from '@redwoodjs/forms'

interface UserSubscriptionsCheckboxProps {
  userSubscriptionId?: number
  onToggleUserSubscription: (id?: number) => void
  loading?: boolean
  label: string
}

const UserSubscriptionsCheckbox = ({
  userSubscriptionId,
  onToggleUserSubscription,
  loading,
  label = 'Abonneren',
}: UserSubscriptionsCheckboxProps) => {
  return (
    <Form className="flex flex-row items-center gap-2">
      <Label
        name="comments"
        className="rw-label mt-0"
        errorClassName="rw-label rw-label-error"
      >
        {label}
      </Label>
      <CheckboxField
        name="comments"
        disabled={loading}
        checked={!!userSubscriptionId}
        onChange={() => {
          onToggleUserSubscription(userSubscriptionId)
        }}
      />
    </Form>
  )
}

export default UserSubscriptionsCheckbox
