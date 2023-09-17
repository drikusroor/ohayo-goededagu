import { UpdateUserPasswordInput } from 'types/graphql'

import {
  Form,
  FormError,
  Label,
  PasswordField,
  RWGqlError,
} from '@redwoodjs/forms'

import Button from '../Button/Button'

interface IUpdatePasswordFormProps {
  onSubmit: (input: UpdateUserPasswordInput) => void
  loading: boolean
  error: RWGqlError
}

const UpdatePasswordForm = ({
  onSubmit,
  loading,
  error,
}: IUpdatePasswordFormProps) => {
  return (
    <div className="rw-form-wrapper">
      <Form<UpdateUserPasswordInput>
        onSubmit={onSubmit}
        error={error}
        className="max-w-md"
      >
        <FormError
          error={error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="currentPassword"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Current password
        </Label>

        <PasswordField
          name="currentPassword"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <Label
          name="newPassword"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          New password
        </Label>

        <PasswordField
          name="newPassword"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true, minLength: 8 }}
        />

        <Label
          name="confirmNewPassword"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Confirm new password
        </Label>

        <PasswordField
          name="confirmNewPassword"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true, minLength: 8 }}
        />

        <Button
          type="submit"
          color="cobalt-blue"
          disabled={loading}
          className="mt-4"
        >
          Update password
        </Button>
      </Form>
    </div>
  )
}

export default UpdatePasswordForm
