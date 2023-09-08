import { ICloudinaryUploadResultInfo } from '../Upload/Upload/Upload'

interface Props {
  images: ICloudinaryUploadResultInfo[]
  preview?: boolean
}

const PhotoGrid = ({ images = [], preview }: Props) => {
  const previewGallery = images?.slice(0, 5)
  return (
    <>
      <div className="mt-4 bg-gray-200 p-2">
        <ul className="flex flex-wrap gap-4">
          {preview &&
            previewGallery.map((photo) => {
              return (
                <>
                  <li
                    className="relative h-[300px] grow basis-auto last:flex-initial"
                    key={photo.imageId}
                  >
                    <img
                      className="h-full w-full rounded-md object-cover align-middle"
                      key={photo.imageId}
                      src={photo.url}
                      alt={photo.imageId}
                    />
                  </li>
                </>
              )
            })}
          {images.map((photo) => {
            return (
              <>
                <li
                  className="relative h-[300px] grow basis-auto last:flex-initial"
                  key={photo.imageId}
                >
                  <img
                    className="h-full w-full rounded-md object-cover align-middle"
                    key={photo.imageId}
                    src={photo.url}
                    alt={photo.imageId}
                  />
                </li>
              </>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default PhotoGrid
