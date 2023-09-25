import { useEffect } from 'react'

import { Image, ImageGalleryImage } from 'types/graphql'

import { classNames } from 'src/lib/class-names'

import ImageModal from '../ImageModal/ImageModal'

interface IPhotoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  images: ImageGalleryImage[]
  preview?: boolean
}

export interface IModalInfo {
  url: string
  id: string
  imageId: string
  title: string
  description: string
}

const PhotoGrid = ({ className, images = [], preview }: IPhotoGridProps) => {
  const previewGallery = images?.slice(0, 4)

  const [modalInfo, setModalInfo] = React.useState<IModalInfo>()

  useEffect(() => {
    if (modalInfo?.id) {
      document.getElementById(modalInfo?.id).style.display = 'block'
    }
  }, [modalInfo])

  const openModal = ({
    url,
    id,
    imageId,
    alt,
    description,
  }: ImageGalleryImage) =>
    setModalInfo({
      url,
      id: id.toString(),
      imageId,
      title: alt,
      description,
    })

  console.log('PhotoGrid: images', images)

  return (
    <>
      <div className={classNames('rounded-md bg-gray-200 p-2', className)}>
        {preview && (
          <ul className="grid grid-cols-2 flex-wrap gap-4">
            {previewGallery.map((photo) => {
              return (
                <li
                  className="relative grow basis-auto last:flex-initial lg:h-[300px]"
                  key={photo.imageId}
                >
                  <img
                    className="h-full w-full rounded-md object-cover align-middle"
                    key={photo.imageId}
                    src={photo.url}
                    alt={photo.alt || photo.imageId}
                  />
                </li>
              )
            })}
          </ul>
        )}
        {!preview && images && (
          <ul className="flex flex-wrap gap-4 md:grid md:grid-cols-2">
            {images.map((photo, index) => {
              return (
                <li
                  className="relative h-[300px] grow basis-auto last:flex-initial"
                  key={photo.imageId}
                >
                  <img
                    className="h-full w-full cursor-pointer rounded-md object-cover align-middle"
                    key={index}
                    src={photo.url}
                    alt={photo.alt || photo.imageId}
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role="button"
                    tabIndex={0}
                    onClick={() => openModal(photo)}
                    onKeyDown={() => openModal(photo)}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <ImageModal info={modalInfo} />
    </>
  )
}

export default PhotoGrid
