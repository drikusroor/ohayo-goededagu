import ImageGalleryCell from 'src/components/ImageGallery/ImageGalleryCell'

type ImageGalleryPageProps = {
  id: number
}

const ImageGalleryPage = ({ id }: ImageGalleryPageProps) => {
  return <ImageGalleryCell id={id} />
}

export default ImageGalleryPage
