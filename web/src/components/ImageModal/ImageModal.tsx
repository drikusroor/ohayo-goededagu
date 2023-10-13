import { useEffect, useRef } from 'react'

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
  onClose: () => void
}

const ImageModal = ({ info, onNext, onPrevious, onClose }: Props) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        onNext()
      }
      if (e.key === 'ArrowLeft') {
        onPrevious()
      }
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [info, onNext, onPrevious, onClose])

  if (!info) return null

  const { id, url, alt, title, description } = info

  return (
    <div
      id={id}
      className="fixed left-0 top-0 z-30 h-full w-full overflow-auto bg-black bg-opacity-70 pt-4 text-white"
      role="button"
      tabIndex={0}
      onKeyDown={onClose}
    >
      <Button
        icon={<BsXLg />}
        className="hover:bg-bg-gray-800 absolute right-2 top-4 cursor-pointer rounded-full border-2 border-white bg-gray-900 text-4xl font-bold text-white hover:text-slate-300 lg:top-16"
        onClick={onClose}
      />

      <Button
        icon={<BsChevronLeft />}
        className="hover:bg-bg-gray-800 fixed left-2 top-1/2 cursor-pointer rounded-full border-2 border-white bg-gray-900 text-4xl font-bold text-white hover:text-slate-300 lg:top-1/2"
        onClick={onPrevious}
      />

      <Button
        icon={<BsChevronRight />}
        className="hover:bg-bg-gray-800 fixed right-2 top-1/2 cursor-pointer rounded-full border-2 border-white bg-gray-900 text-4xl font-bold text-white hover:text-slate-300 lg:top-1/2"
        onClick={onNext}
      />

      <div
        className="flex h-screen w-full flex-col items-center justify-center px-4 py-4 xl:px-20 xl:py-20"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyDown={onClose}
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
  )
}

export default ImageModal
