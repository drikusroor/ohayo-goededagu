import type {
  EditImageGalleryById,
  UpdateImageGalleryInput,
} from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormImageGallery = NonNullable<EditImageGalleryById['imageGallery']>

interface ImageGalleryFormProps {
  imageGallery?: EditImageGalleryById['imageGallery']
  onSave: (data: UpdateImageGalleryInput, id?: FormImageGallery['id']) => void
  error: RWGqlError
  loading: boolean
}

const ImageGalleryForm = (props: ImageGalleryFormProps) => {
  const onSubmit = (data: FormImageGallery) => {
    props.onSave(data, props?.imageGallery?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormImageGallery> onSubmit={onSubmit} error={props.error}>
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
          defaultValue={props.imageGallery?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="description"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Description
        </Label>

        <TextField
          name="description"
          defaultValue={props.imageGallery?.description}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="description" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ImageGalleryForm
