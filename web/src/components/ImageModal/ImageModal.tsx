interface Props {
  info: object
}

const ImageModal = ({ info }: Props) => {
  const closeModal = () => {
    document.getElementById('modal').style.display = 'none'
  }

  return (
    <div
      id="modal"
      className="fixed left-0 top-0 hidden h-full w-full overflow-auto bg-black bg-opacity-70 pt-2.5 text-white z-50"
    >
      <span
        className="absolute right-6 top-20 cursor-pointer text-4xl font-bold text-white"
        onClick={() => {
          closeModal()
        }}
      >
        &times;
      </span>
      <div
        className="flex h-full w-full items-center justify-center px-20 py-20"
        onClick={() => {
          closeModal()
        }}
      >
        <div className="flex flex-col gap-2">
          <img
            id="modalImage"
            className="h-full w-fit rounded-md"
            src={info?.url}
            key={info?.id}
            alt={info?.id}
          />
          {info?.title && <span className="text-xl">{info?.title}</span>}
          {info?.description && <span>{info?.description}</span>}
        </div>
      </div>
    </div>
  )
}

export default ImageModal
