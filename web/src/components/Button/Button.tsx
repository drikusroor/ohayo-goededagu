interface ButtonProps {
  onClick?: () => void
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
      ? `bg-${theme} text-white transition hover:brightness-110 hover:filter`
      : `border-${theme} text-${theme} hover:bg-${theme} hover:text-white transition-colors`

  return (
    <button
      type={type}
      aria-label={text}
      title={title ? title : text ? text : ''}
      className={`block rounded px-3 py-2 text-xs font-semibold uppercase
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
