interface Props {
  url: string
  id: string
  title?: string
  description?: string
}

const ImageModal = ({url, id, title, description}: Props) => {
  const closeModal = () => {
    document.getElementById("modal").style.display = "none"
  }

  return (
    <div id="modal" className='hidden fixed pt-2.5 left-0 top-0 w-full h-full overflow-auto bg-black bg-opacity-70 text-white'>
      <span
        className='text-white absolute top-20 right-6 font-bold text-4xl cursor-pointer'
        onClick={() => {
          closeModal()
        }}>&times;</span>
      <div
        className='flex justify-center py-20 px-20 items-center h-full w-full'
        onClick={() => {
          closeModal()
        }}>
        <div className='flex flex-col gap-2'>
          <img id="modalImage" className="h-full w-fit rounded-md" src={url} key={id} alt={id} />
          {title && (
          <span className="text-xl">{title}</span>
          )}
          {description && (
          <span>{description}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageModal
