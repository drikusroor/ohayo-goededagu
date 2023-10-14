import { useEffect } from 'react'

import { ImageGalleryImage } from 'types/graphql'

import { classNames } from 'src/lib/class-names'
import { getCompressedImageUrl } from 'src/lib/get-compressed-image-url'

import ImageModal, { IModalInfo } from '../ImageModal/ImageModal'

interface IPhotoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  images: ImageGalleryImage[]
  preview?: boolean
}

const PhotoGrid = ({ className, images = [], preview }: IPhotoGridProps) => {
  const previewGallery = images?.slice(0, 4).map((image) => ({
    ...image,
    url: getCompressedImageUrl(image.url),
  }))

  const [modalInfo, setModalInfo] = React.useState<IModalInfo>()

  const openModal = (
    { url, id, imageId, alt, title, description }: ImageGalleryImage,
    index: number
  ) => {
    return setModalInfo({
      url,
      id: id.toString(),
      imageId,
      alt,
      title,
      description,
      index,
    })
  }

  const onNext = (newIndex: number) => {
    const nextImage = images[newIndex]
    if (nextImage) {
      openModal(nextImage, newIndex)
    }
  }

  const onPrevious = (newIndex: number) => {
    const previousImage = images[newIndex]
    if (previousImage) {
      openModal(previousImage, newIndex)
    }
  }

  const onClose = () => {
    setModalInfo(undefined)
  }

  const onKeyDown = (
    e: KeyboardEvent,
    photo: ImageGalleryImage,
    index: number
  ) => {
    if (modalInfo?.id && modalInfo?.id === photo.id.toString()) {
      return
    }

    return e.key === 'Enter' || e.key === ' ' ? openModal(photo, index) : null
  }

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
                    alt={
                      photo.alt ||
                      [photo.title, photo.description]
                        .filter(Boolean)
                        .join(' - ')
                    }
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
                    alt={
                      photo.alt ||
                      [photo.description, photo.title]
                        .filter(Boolean)
                        .join(' - ')
                    }
                    onClick={() => openModal(photo, index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => onKeyDown(e, photo, index)}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <ImageModal
        info={modalInfo}
        onNext={() => onNext(modalInfo?.index + 1)}
        onPrevious={() => onPrevious(modalInfo?.index - 1)}
        onClose={onClose}
      />
    </>
  )
}

export default PhotoGrid
