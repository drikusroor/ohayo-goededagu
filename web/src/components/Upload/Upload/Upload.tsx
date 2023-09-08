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
  setCoverImage?: (value: ICloudinaryUploadResultInfo) => void
  setProfilePicture?: (value: ICloudinaryUploadResultInfo) => void
}

const Upload = ({
  name,
  multiple,
  setCoverImage,
  setProfilePicture,
}: IUploadProps) => {
  const widget = cloudinary.createUploadWidget(
    {
      cloudName: 'dl5elpdjy',
      uploadPreset: 'bcfnswai',
      multiple: multiple ? multiple : true,
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        if (name === 'profilePicture') {
          setProfilePicture(result.info as ICloudinaryUploadResultInfo)
        } else if (name === 'coverImage') {
          setCoverImage(result.info as ICloudinaryUploadResultInfo)
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
        className="rw-button rw-button-blue"
        onClick={onClickUpload}
        text="Upload image"
      />
      <FieldError name="upload" className="rw-field-error" />
    </>
  )
}

export default Upload
