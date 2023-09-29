import type {
  EditUserSubscriptionById,
  UpdateUserSubscriptionInput,
} from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  RadioField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormUserSubscription = NonNullable<
  EditUserSubscriptionById['userSubscription']
>

interface UserSubscriptionFormProps {
  userSubscription?: EditUserSubscriptionById['userSubscription']
  onSave: (
    data: UpdateUserSubscriptionInput,
    id?: FormUserSubscription['id']
  ) => void
  error: RWGqlError
  loading: boolean
}

const UserSubscriptionForm = (props: UserSubscriptionFormProps) => {
  const onSubmit = (data: FormUserSubscription) => {
    props.onSave(data, props?.userSubscription?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormUserSubscription> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.userSubscription?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="type"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Type
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="userSubscription-type-0"
            name="type"
            defaultValue="POST_AUTHOR"
            defaultChecked={props.userSubscription?.type?.includes(
              'POST_AUTHOR'
            )}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Post Author</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="userSubscription-type-1"
            name="type"
            defaultValue="POST_TYPE"
            defaultChecked={props.userSubscription?.type?.includes('POST_TYPE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Post Type</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="userSubscription-type-2"
            name="type"
            defaultValue="COMMENT"
            defaultChecked={props.userSubscription?.type?.includes('COMMENT')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />
          <div>Comment</div>
        </div>

        <FieldError name="type" className="rw-field-error" />

        <Label
          name="target"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Target
        </Label>

        <NumberField
          name="target"
          defaultValue={props.userSubscription?.target}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="target" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default UserSubscriptionForm
