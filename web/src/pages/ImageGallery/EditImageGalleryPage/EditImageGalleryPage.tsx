import EditImageGalleryCell from 'src/components/ImageGallery/EditImageGalleryCell'

type ImageGalleryPageProps = {
  id: number
}

const EditImageGalleryPage = ({ id }: ImageGalleryPageProps) => {
  return <EditImageGalleryCell id={id} />
}

export default EditImageGalleryPage
