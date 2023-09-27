import { useEffect } from 'react'

import { BsUpload } from 'react-icons/bs'

import { FieldError } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'
import { CreateUploadWidgetResponse, ICloudinary } from 'src/types/cloudinary'

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
  folder?: string
  multiple?: boolean
  handleUpload: (value: ICloudinaryUploadResultInfo[]) => void
  setUploadedImages?: (value: ICloudinaryUploadResultInfo[]) => void
}

const Upload = ({
  name,
  folder,
  multiple,
  handleUpload,
  setUploadedImages,
}: IUploadProps) => {
  const defaultFolder =
    name === 'avatar' ? 'Avatars' : name === 'coverImage' ? 'Cover images' : ''

  const [widget, setWidget] =
    React.useState<CreateUploadWidgetResponse | null>()

  useEffect(() => {
    const createUploadWidgetResult = (
      window.cloudinary as ICloudinary
    ).createUploadWidget(
      {
        cloudName: process.env.CLOUD_NAME,
        uploadPreset: process.env.UPLOAD_PRESET,
        multiple: multiple ? multiple : true,
        folder: folder ? folder : defaultFolder,
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
          if (name !== 'avatar') {
            setUploadedImages(images as ICloudinaryUploadResultInfo[])
          }
          handleUpload(images as ICloudinaryUploadResultInfo[])
        }
      }
    )

    setWidget(createUploadWidgetResult)

    return () => {
      widget?.close()
      widget?.destroy()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        textStay
        color="cobalt-blue"
        icon={<BsUpload />}
        size="sm"
        onClick={onClickUpload}
        text={uploadName}
        defaultValue={uploadName}
      />
      <FieldError name={name} className="rw-field-error" />
    </>
  )
}

export default Upload
