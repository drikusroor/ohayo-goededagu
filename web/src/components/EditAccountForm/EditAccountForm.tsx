import { BsSaveFill, BsXCircle } from 'react-icons/bs'
import type { UpdateUserProfileInput, EditUserProfileById } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  EmailField,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

import Button from '../Button/Button'

type FormAccount = NonNullable<EditUserProfileById['user']>

interface EditAccountFormProps {
  user?: EditUserProfileById['user']
  onSave: (data: UpdateUserProfileInput) => void
  error: RWGqlError
  loading: boolean
}

const EditAccountForm = (props: EditAccountFormProps) => {
  const formRef = React.useRef<HTMLFormElement>(null)

  const onSubmit = (data: FormAccount) => {
    props.onSave(
      {
        ...data,
        email: data.email.toLowerCase(),
      },
      props.user?.id
    )
  }

  const onReset = () => {
    formRef.current?.reset()
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormAccount>
        onSubmit={onSubmit}
        error={props.error}
        ref={formRef}
        className="rw-form-wrapper"
      >
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="email"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          E-mail
        </Label>

        <EmailField
          name="email"
          className="rw-input"
          defaultValue={props.user?.email}
          title="Email"
          placeholder="E-mailadres"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="email" className="rw-field-error" />

        <div className="button-group">
          <Button
            text="Opslaan"
            type="submit"
            icon={<BsSaveFill />}
            disabled={props.loading}
            color="cobalt-blue"
            size="sm"
          />

          <Button
            text="Annuleren"
            size="sm"
            color="monza-red"
            icon={<BsXCircle />}
            variant="outlined"
            onClick={onReset}
          />
        </div>
      </Form>
    </div>
  )
}

export default EditAccountForm
