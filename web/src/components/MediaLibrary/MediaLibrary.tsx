import { BsImages } from 'react-icons/bs'

import { FieldError } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'
import { ICloudinary } from 'src/types/cloudinary'

import { ICloudinaryUploadResultInfo } from '../Upload/Upload/Upload'

interface IMediaLibraryProps {
  name: string
  handleMediaLibrary: (value: ICloudinaryUploadResultInfo[]) => void
  setUploadedImages?: (value: ICloudinaryUploadResultInfo[]) => void
}

const MediaLibrary = ({
  name,
  handleMediaLibrary,
  setUploadedImages,
}: IMediaLibraryProps) => {
  const onClickOpen = () => {
    window.ml = (window.cloudinary as ICloudinary).openMediaLibrary(
      {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        username: process.env.USERNAME,
      },
      {
        insertHandler: function (data) {
          if (name !== 'avatar') {
            setUploadedImages(data.assets as ICloudinaryUploadResultInfo[])
          }
          handleMediaLibrary(data.assets as ICloudinaryUploadResultInfo[])
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
        textStay
        color="cobalt-blue"
        size="sm"
        onClick={onClickOpen}
        text="Select from Media Library"
        icon={<BsImages />}
      />
      <FieldError name="upload" className="rw-field-error" />
    </>
  )
}

export default MediaLibrary
