import { FieldError } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'

declare const cloudinary: unknown

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
  handleUpload: (value: ICloudinaryUploadResultInfo[]) => void
}

const Upload = ({ name, multiple, handleUpload }: IUploadProps) => {
  const defaultFolder =
  name === 'profilePicture'
    ? 'Profile pictures'
    : name === 'coverImage'
    ? 'Cover images'
    : ''

  const widget = cloudinary.createUploadWidget(
    {
      cloudName: process.env.CLOUD_NAME,
      uploadPreset: process.env.UPLOAD_PRESET,
      multiple: multiple ? multiple : true,
      folder: defaultFolder,
    },
    (error, result) => {
      if (error) {
        console.log('Error uploading image: ', error)
      }

      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info)
      }

      if (result?.info?.files) {
        const images = result.info.files.map((image) => image.uploadInfo)
        handleUpload(images as ICloudinaryUploadResultInfo[])
      }
    }
  )

  const onClickUpload = () => {
    widget.open()
  }

  const uploadName =
    name === 'coverImage'
      ? 'Upload cover image'
      : name === 'avatar'
      ? 'Upload avatar'
      : 'Upload gallery images'

  return (
    <>
      <Button
        id="upload_widget"
        title={uploadName}
        onClick={onClickUpload}
        text={uploadName}
        defaultValue={uploadName}
        className="rw-button rw-button-blue mt-4"
        errorClassName="rw-button rw-button-blue rw-button-error"
      />
      <FieldError name={name} className="rw-field-error" />
    </>
  )
}

export default Upload
