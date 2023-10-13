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

  useEffect(() => {
    if (modalInfo?.id) {
      document.getElementById(modalInfo?.id).style.display = 'block'
    }
  }, [modalInfo])

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

  const onNext = () => {
    const nextIndex = modalInfo?.index + 1
    const nextImage = images[nextIndex]
    if (nextImage) {
      openModal(nextImage, nextIndex)
    }
  }

  const onPrevious = () => {
    const previousIndex = modalInfo?.index - 1
    const previousImage = images[previousIndex]
    if (previousImage) {
      openModal(previousImage, previousIndex)
    }
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
                    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role="button"
                    tabIndex={0}
                    onClick={() => openModal(photo, index)}
                    onKeyDown={() => openModal(photo, index)}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </div>
      <ImageModal info={modalInfo} onNext={onNext} onPrevious={onPrevious} />
    </>
  )
}

export default PhotoGrid
