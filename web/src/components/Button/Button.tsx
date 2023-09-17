interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
  disabled,
  type = 'button',
  variant: variant = 'filled',
}: IButtonProps) => {
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
      disabled={disabled}
      className={`block rounded px-3 py-2 font-semibold uppercase
      ${disabled ? 'cursor-not-allowed opacity-50' : ''}
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
