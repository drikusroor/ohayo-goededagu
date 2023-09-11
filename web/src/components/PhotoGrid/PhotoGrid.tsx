import { Image } from 'types/graphql'

import { classNames } from 'src/lib/class-names'

interface IPhotoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  images: Image[]
  preview?: boolean
}

const PhotoGrid = ({ className, images = [], preview }: IPhotoGridProps) => {
  const previewGallery = images?.slice(0, 4)

  return (
    <div className={classNames('rounded-md bg-gray-200 p-2', className)}>
      <ul className="grid grid-cols-2 flex-wrap gap-4 md:flex">
        {preview &&
          previewGallery.map((photo) => {
            return (
              <li
                className="relative grow basis-auto last:flex-initial lg:h-[300px]"
                key={photo.imageId}
              >
                <img
                  className="h-full w-full rounded-md object-cover align-middle"
                  key={photo.imageId}
                  src={photo.url}
                  alt={photo.imageId}
                />
              </li>
            )
          })}
        {!preview &&
          images.map((photo) => {
            return (
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
            )
          })}
      </ul>
    </div>
  )
}

export default PhotoGrid
