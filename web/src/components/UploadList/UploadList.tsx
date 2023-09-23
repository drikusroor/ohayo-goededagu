import { ICloudinaryUploadResultInfo } from '../Upload/Upload/Upload'

interface IUploadListProps {
  images: ICloudinaryUploadResultInfo[]
}

const UploadList = ({ images }: IUploadListProps) => {
  const title = (photo) => {
    if (photo.context) {
      return photo.context.custom.caption
    } else if (photo.original_filename) {
      return photo.original_filename
    } else {
      return ''
    }
  }

  const description = (photo) => {
    if (photo.context) {
      return photo.context.custom.alt
    } else {
      return ''
    }
  }

  return (
    <div className="mt-2">
      <ul className="flex gap-2">
        {images &&
          images.map((photo) => {
            return (
              <li className="flex flex-row gap-1" key={photo.public_id}>
                <img
                  className="h-20 w-20"
                  key={photo.public_id}
                  src={photo.secure_url}
                  alt={photo.public_id}
                />
                <div className="flex flex-col">
                  <span className="font-bold"> {title(photo)} </span>
                  <span> {description(photo)} </span>
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default UploadList
