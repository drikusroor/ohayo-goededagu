import ReactQuill from 'react-quill'
import type { FindProfileSelf, UpdateProfileInput } from 'types/graphql'

import 'react-quill/dist/quill.snow.css'
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
  const [bio, setBio] = React.useState(props.profile?.bio || '')

  const onSubmit = (data: FormProfile) => {
    data.bio = bio
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
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.profile?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Label
          name="japaneseName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Japanese name
        </Label>

        <TextField
          name="japaneseName"
          defaultValue={props.profile?.japaneseName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <Label
          name="bio"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Bio
        </Label>

        <div className="bg-white">
          <ReactQuill theme="snow" value={bio} onChange={setBio} />
        </div>

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
