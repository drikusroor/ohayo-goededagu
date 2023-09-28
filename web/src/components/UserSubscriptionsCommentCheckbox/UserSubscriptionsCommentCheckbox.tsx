import { CheckboxField, Form, Label } from '@redwoodjs/forms'

interface UserSubscriptionsCommentCheckboxProps {
  userSubscriptionId?: number
  onToggleUserSubscriptionComments: (id?: number) => void
  loading?: boolean
}

const UserSubscriptionsCommentCheckbox = ({
  userSubscriptionId,
  onToggleUserSubscriptionComments,
  loading,
}: UserSubscriptionsCommentCheckboxProps) => {
  return (
    <Form className="flex flex-row items-center gap-2">
      <Label
        name="comments"
        className="rw-label mt-0"
        errorClassName="rw-label rw-label-error"
      >
        Abonneren op reacties
      </Label>
      <CheckboxField
        name="comments"
        disabled={loading}
        checked={!!userSubscriptionId}
        onChange={() => {
          onToggleUserSubscriptionComments(userSubscriptionId)
        }}
      />
    </Form>
  )
}

export default UserSubscriptionsCommentCheckbox
