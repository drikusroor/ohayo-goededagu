import { BsXLg } from 'react-icons/bs'

import Button from '../Button/Button'
import { IModalInfo } from '../PhotoGrid/PhotoGrid'

interface Props {
  info: IModalInfo
}

const ImageModal = ({ info }: Props) => {
  if (!info) return null

  const { id, url, title, description } = info

  const closeModal = () => {
    document.getElementById(id).style.display = 'none'
  }

  return (
    <>
      {info && (
        <div
          id={id}
          className="fixed left-0 top-0 z-30 hidden h-full w-full overflow-auto bg-black bg-opacity-70 pt-2.5 text-white"
        >
          <Button
            className="absolute right-6 top-20 cursor-pointer bg-transparent text-4xl font-bold text-white hover:bg-transparent hover:text-slate-300"
            onClick={() => {
              closeModal()
            }}
          >
            <BsXLg />
          </Button>
          <div
            className="flex h-full w-full items-center justify-center px-20 py-20"
            role="button"
            tabIndex={0}
            onClick={() => {
              closeModal()
            }}
            onKeyDown={() => {
              closeModal()
            }}
          >
            <div className="flex flex-col gap-2">
              <img
                id="modalImage"
                className="h-full w-fit rounded-md"
                src={url}
                key={id}
                alt={`${title} - ${description}`}
              />
              {title && <span className="text-xl">{title}</span>}
              {description && <span>{description}</span>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ImageModal
