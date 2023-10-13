import { BsChevronLeft, BsChevronRight, BsXLg } from 'react-icons/bs'

import Button from '../Button/Button'

export interface IModalInfo {
  url: string
  id: string
  imageId: string
  alt: string
  title: string
  description: string
  index: number
}
interface Props {
  info: IModalInfo
  onNext: () => void
  onPrevious: () => void
}

const ImageModal = ({ info, onNext, onPrevious }: Props) => {
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
            icon={<BsXLg />}
            className="hover:bg-bg-gray-800 absolute right-2 top-4 cursor-pointer rounded-full border-2 border-white bg-gray-900 text-4xl font-bold text-white hover:text-slate-300 lg:top-16"
            onClick={() => {
              closeModal()
            }}
          />
          <Button
            icon={<BsChevronLeft />}
            className="hover:bg-bg-gray-800 fixed left-2 top-1/2 cursor-pointer rounded-full border-2 border-white bg-gray-900 text-4xl font-bold text-white hover:text-slate-300 lg:top-1/2"
            onClick={() => {
              onPrevious()
            }}
          />

          <Button
            icon={<BsChevronRight />}
            className="hover:bg-bg-gray-800 fixed right-2 top-1/2 cursor-pointer rounded-full border-2 border-white bg-gray-900 text-4xl font-bold text-white hover:text-slate-300 lg:top-1/2"
            onClick={() => {
              onNext()
            }}
          />

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
