import type { UpdateUserProfileInput, EditUserProfileById } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'

import Button from '../Button/Button'

type FormAccount = NonNullable<EditUserProfileById['user']>

interface EditAccountFormProps {
  user?: EditUserProfileById['user']
  onSave: (data: UpdateUserProfileInput) => void
  error: RWGqlError
  loading: boolean
}

const EditAccountForm = (props: EditAccountFormProps) => {
  const onSubmit = (data: FormAccount) => {
    props.onSave(data)
  }

  console.log({ props })

  return (
    <div className="rw-form-wrapper">
      <Form<FormAccount> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.user?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>

          <Link to={routes.account()}>
            <Button color="monza-red" variant="outlined">
              Cancel
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  )
}

export default EditAccountForm
