import { BsBoxArrowUpRight } from 'react-icons/bs'
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
import { Link } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import Avatar from 'src/components/Avatar/Avatar'
import MediaLibrary from 'src/components/MediaLibrary/MediaLibrary'
import Upload, {
  ICloudinaryUploadResultInfo,
} from 'src/components/Upload/Upload/Upload'

type FormProfile = NonNullable<FindProfileSelf['profile']>

interface ProfileFormProps {
  profile?: FindProfileSelf['profile']
  onSave: (data: UpdateProfileInput) => void
  error: RWGqlError
  loading: boolean
}

const ProfileForm = (props: ProfileFormProps) => {
  const { isAuthenticated, hasRole } = useAuth()

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

  const handleUpload = (value: ICloudinaryUploadResultInfo[]) => {
    const [{ secure_url }] = value

    setProfilePicture(secure_url)
  }

  const handleMediaLibraryResponse = (value: ICloudinaryUploadResultInfo[]) => {
    const [{ secure_url }] = value

    setProfilePicture(secure_url)
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
          <Link
            to="https://japanga.com/name-converter"
            target="_blank"
            className="ml-4 text-sm text-blue-500 underline hover:text-blue-700"
          >
            <span className="sr-only">Open in new tab</span>
            Hulp nodig?
            <BsBoxArrowUpRight className="ml-2 inline-block" />
          </Link>
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
          className="rw-label mb-2"
          errorClassName="rw-label rw-label-error"
        >
          Avatar
        </Label>

        <div className="flex flex-row flex-wrap items-center gap-2">
          <Upload
            name="avatar"
            folder="Avatars"
            multiple={false}
            handleUpload={handleUpload}
          />

          {isAuthenticated && hasRole('MODERATOR' || 'ADMIN') && (
            <MediaLibrary
              name="avatar"
              handleMediaLibrary={handleMediaLibraryResponse}
            />
          )}

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
