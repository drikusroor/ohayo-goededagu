import { useState, useEffect } from 'react'

import { BsArrowUp } from 'react-icons/bs'

import { classNames } from 'src/lib/class-names'

import Button from '../Button/Button'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        // You can adjust this value as per your need
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Button
      icon={<BsArrowUp className="h-6 w-6" />}
      onClick={scrollToTop}
      className={classNames(
        'fixed bottom-5 right-5 z-20 transform-gpu rounded-full bg-cobalt-blue-500 !p-2 text-white drop-shadow-md transition duration-300 ease-in-out sm:hover:scale-105',
        isVisible && 'translate-y-0 opacity-100',
        !isVisible && 'translate-y-16 !opacity-0'
      )}
    />
  )
}

export default ScrollToTop
