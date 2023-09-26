import { BsXLg } from 'react-icons/bs'

import Button from '../Button/Button'
import { IModalInfo } from '../PhotoGrid/PhotoGrid'

interface Props {
  info: IModalInfo
}

const ImageModal = ({ info }: Props) => {
  if (!info) return null

  const { id, url, alt, title, description } = info

  const closeModal = () => {
    document.getElementById(id).style.display = 'none'
  }

  return (
    <>
      {info && (
        <div
          id={id}
          className="fixed left-0 top-0 z-30 hidden h-full w-full overflow-auto bg-black bg-opacity-70 pt-4 text-white"
        >
          <Button
            className="absolute right-2 top-4 cursor-pointer bg-transparent text-4xl font-bold text-white hover:bg-transparent hover:text-slate-300 lg:top-16"
            onClick={() => {
              closeModal()
            }}
          >
            <BsXLg />
          </Button>
          <div
            className="flex h-screen w-full flex-col items-center justify-center px-4 py-4 xl:px-20 xl:py-20"
            role="button"
            tabIndex={0}
            onClick={() => {
              closeModal()
            }}
            onKeyDown={() => {
              closeModal()
            }}
          >
            <img
              id="modalImage"
              className="max-h-[80%] rounded-md sm:max-w-[80%]"
              src={url}
              key={id}
              alt={alt || [title, description].filter(Boolean).join(' - ')}
            />
            {title && <span className="text-xl">{title}</span>}
            {description && <span>{description}</span>}
          </div>
        </div>
      )}
    </>
  )
}

export default ImageModal
