import { FieldError } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'

declare const cloudinary: any

export interface ICloudinaryMediaLibraryAsset {
  public_id: string
  resource_type: string
  type: string
  format: string
  version: number
  url: string
  secure_url: string
  width: number
  height: number
  bytes: number
  duration: string
  tags: string[]
  metadata: []
  created_at: Date
  access_mode: string
  access_control: string[]
  created_by: string
  uploaded_by: string
}

interface IMediaLibraryProps {
  name: string
  handleMediaLibrary: (value: ICloudinaryMediaLibraryAsset[]) => void
}

const MediaLibrary = ({ name, handleMediaLibrary }: IMediaLibraryProps) => {
  const onClickOpen = () => {
    window.ml = cloudinary.openMediaLibrary(
      {
        cloud_name: 'dl5elpdjy',
        api_key: '929416121543777',
        username: 'nreliasar@gmail.com',
      },
      {
        insertHandler: function (data) {
          data.assets.forEach((asset: ICloudinaryMediaLibraryAsset) => {
            console.log('Inserted asset:', JSON.stringify(asset, null, 2))
          })
          handleMediaLibrary(data.assets as ICloudinaryMediaLibraryAsset[])
        },
      },
      document.getElementById('media_library_widget')
    )
  }

  return (
    <>
      <Button
        id="media_library_widget"
        title="Media library"
        className="rw-button rw-button-blue mt-4"
        onClick={onClickOpen}
        text='Select from Media Library'
      />
      <FieldError name="upload" className="rw-field-error" />
    </>
  )
}

export default MediaLibrary
