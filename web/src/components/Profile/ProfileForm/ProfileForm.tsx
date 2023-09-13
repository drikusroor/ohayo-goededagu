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

import Avatar from 'src/components/Avatar/Avatar'
import MediaLibrary from 'src/components/MediaLibrary/MediaLibrary'
import Upload from 'src/components/Upload/Upload/Upload'

type FormProfile = NonNullable<FindProfileSelf['profile']>

interface ProfileFormProps {
  profile?: FindProfileSelf['profile']
  onSave: (data: UpdateProfileInput) => void
  error: RWGqlError
  loading: boolean
}

const ProfileForm = (props: ProfileFormProps) => {
  const onSubmit = (data: FormProfile) => {
    if (profilePicture) {
      if (data.avatar) {
        delete data.avatar
      }
      data.avatar = profilePicture
    }
    props.onSave(data)
  }

  const [profilePicture, setProfilePicture] = React.useState<string>(
    props.profile?.avatar || ''
  )
  console.log('profile', profilePicture)

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

        <div className="mt-4 flex flex-row items-center gap-4">
          <Upload
            name="avatar"
            multiple={false}
            handleUpload={([{ secure_url }]) => setProfilePicture(secure_url)}
          />

          <MediaLibrary
            name="avatar"
            handleMediaLibrary={([{ secure_url }]) =>
              setProfilePicture(secure_url)
            }
          />

          {profilePicture && (
            <Avatar src={profilePicture} alt="ProfilePicture" />
          )}
        </div>

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
