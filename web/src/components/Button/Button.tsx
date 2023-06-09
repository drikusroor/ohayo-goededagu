import { icon } from '@fortawesome/fontawesome-svg-core'
import { IconBase } from 'react-icons/lib'

interface ButtonProps {
  onClick?: () => void
  id?: string
  className?: string
  color?: 'cobalt-blue' | 'monza-red' | ''
  children?: React.ReactNode
  text?: string
  title?: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'filled' | 'outlined' | ''
}

const Button = ({
  onClick,
  id = '',
  className = '',
  color = '',
  text = '',
  title = '',
  children,
  type = 'button',
  variant: variant = 'filled',
}: ButtonProps) => {
  const theme = color ? color : 'cobalt-blue'
  const buttonColors =
    variant === 'filled'
      ? `bg-${theme}-600 text-white transition hover:bg-${theme}-500 hover:filter`
      : `border-${theme}-500 text-${theme}-500 hover:bg-${theme}-500 hover:text-white transition-colors`
  return (
    <button
      id={id}
      type={type}
      aria-label={text}
      title={title ? title : text ? text : ''}
      className={`block rounded px-3 py-2 font-semibold uppercase
      ${buttonColors}
      ${className}
      `}
      onClick={onClick}
    >
      {text}
      {children}
    </button>
  )
}

export default Button
