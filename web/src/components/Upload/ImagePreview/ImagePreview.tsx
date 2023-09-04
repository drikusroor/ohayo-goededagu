import { BsPencil } from 'react-icons/bs'

import { FieldError, Label, TextField } from '@redwoodjs/forms'

interface ImagePreviewProps {
  images: object
  title?: string
  setTitle?: (value) => void
}

const ImagePreview = (props: ImagePreviewProps) => {
  return (
    <>
      <ul className="flex flex-wrap gap-2">
        {props.images?.map((photo) => {
          return (
            <>
              <li className="" key={photo.public_id}>
                {photo.original_filename}
                <BsPencil />

                <Label
                  name="imageTitle"
                  className="rw-label"
                  errorClassName="rw-label rw-label-error"
                >
                  Set the title for the image
                </Label>

                <TextField
                  name="imageTitle"
                  defaultValue={photo.original_filename}
                  className="rw-input"
                  errorClassName="rw-input rw-input-error"
                  onChange={(e) => {
                    props.setTitle(e.target.value)
                  }}
                  validation={{ required: true }}
                />

                <FieldError name="imageTitle" className="rw-field-error" />

                <img
                  className="max-h-96"
                  key={photo.public_id}
                  src={photo.secure_url}
                  alt={photo.original_filename}
                />
              </li>
            </>
          )
        })}
      </ul>
    </>
  )
}

export default ImagePreview
