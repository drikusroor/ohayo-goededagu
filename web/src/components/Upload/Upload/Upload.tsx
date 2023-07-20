import { ButtonField, FieldError } from '@redwoodjs/forms'

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
}

const Upload = ({ name, multiple, setCoverImage }: IUploadProps) => {
  const widget = cloudinary.createUploadWidget(
    {
      cloudName: 'dl5elpdjy',
      uploadPreset: 'bcfnswai',
      multiple: multiple ? multiple : true,
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info)
        setCoverImage(result.info as ICloudinaryUploadResultInfo)
      }
    }
  )

  const onClickUpload = () => {
    widget.open()
  }

  return (
    <>
      <ButtonField
        id="upload_widget"
        name={name}
        defaultValue="Upload cover image"
        className="rw-button rw-button-blue mt-4"
        errorClassName="rw-button rw-button-blue rw-button-error"
        onClick={() => {
          onClickUpload()
        }}
      />
      <FieldError name="upload" className="rw-field-error" />
    </>
  )
}

export default Upload
