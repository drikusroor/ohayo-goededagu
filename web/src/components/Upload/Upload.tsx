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
  value?: ICloudinaryUploadResultInfo
  setValue?: (value: ICloudinaryUploadResultInfo) => void
}

const Upload = ({ name, value, setValue }: IUploadProps) => {
  const widget = cloudinary.createUploadWidget(
    {
      cloudName: 'dl5elpdjy',
      uploadPreset: 'bcfnswai',
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info)
        setValue(result.info as ICloudinaryUploadResultInfo)
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
        defaultValue="Upload image"
        className="rw-button rw-button-blue mt-4"
        errorClassName="rw-button rw-button-blue rw-button-error"
        onClick={() => {
          onClickUpload()
        }}
      />

      <FieldError name="upload" className="rw-field-error" />

      {value && <img className="mt-2" alt="cover" src={value.secure_url} />}
    </>
  )
}

export default Upload
