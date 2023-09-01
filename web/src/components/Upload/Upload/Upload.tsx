import { FieldError } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'

declare const cloudinary: any

export interface ICloudinaryUploadResultInfo {
  id: string
  batchId: string
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: Date
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  folder: string
  access_mode: string
  original_filename: string
  path: string
  thumbnail_url: string
}

interface IUploadProps {
  name: string
  multiple?: boolean
  folder?: string
  setCoverImage?: (value: ICloudinaryUploadResultInfo) => void
  setPhotoGallery?: (value) => void
}

const Upload = ({
  name,
  multiple,
  folder,
  setCoverImage,
  setPhotoGallery,
}: IUploadProps) => {
  const gallery = []

  const widget = cloudinary.createUploadWidget(
    {
      cloudName: 'dl5elpdjy',
      uploadPreset: 'bcfnswai',
      folder: folder ? folder : '',
      multiple: multiple ? multiple : true,
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        if (name === 'coverImage') {
          setCoverImage(result.info as ICloudinaryUploadResultInfo)
        } else {
          gallery.push(result.info as ICloudinaryUploadResultInfo)
          setPhotoGallery(gallery)
        }
      }
    }
  )

  const onClickUpload = () => {
    widget.open()
  }

  return (
    <>
      <Button
        id="upload_widget"
        title="Upload files"
        onClick={onClickUpload}
        text="Upload image"
        defaultValue={
          name === 'coverImage' ? 'Upload cover image' : 'Upload images'
        }
        className="rw-button rw-button-blue mt-4"
        errorClassName="rw-button rw-button-blue rw-button-error"
      />
      <FieldError name="upload" className="rw-field-error" />
    </>
  )
}

export default Upload
