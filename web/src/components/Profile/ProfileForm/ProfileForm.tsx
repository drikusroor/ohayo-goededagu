import type { FindProfileSelf, UpdateProfileInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormProfile = NonNullable<FindProfileSelf['profile']>

interface ProfileFormProps {
  profile?: FindProfileSelf['profile']
  onSave: (data: UpdateProfileInput) => void
  error: RWGqlError
  loading: boolean
}

const ProfileForm = (props: ProfileFormProps) => {
  const onSubmit = (data: FormProfile) => {
    props.onSave(data)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormProfile> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="bio"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Bio
        </Label>

        <TextField
          name="bio"
          defaultValue={props.profile?.bio}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="bio" className="rw-field-error" />

        <Label
          name="avatar"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Avatar
        </Label>

        <TextField
          name="avatar"
          defaultValue={props.profile?.avatar}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="avatar" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ProfileForm
