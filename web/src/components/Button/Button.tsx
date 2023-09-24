interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  id?: string
  className?: string
  color?: 'cobalt-blue' | 'monza-red' | ''
  size?: 'xs' | 'sm' | 'md' | 'lg'
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
  size = '',
  text = '',
  title = '',
  children,
  disabled,
  type = 'button',
  variant: variant = 'filled',
  ...props
}: IButtonProps) => {
  const theme = color ? color : 'cobalt-blue'
  const buttonColors =
    variant === 'filled'
      ? `bg-${theme}-600 text-white transition hover:bg-${theme}-500 hover:filter`
      : `border-${theme}-500 text-${theme}-500 hover:bg-${theme}-500 hover:text-white transition-colors`
  const buttonSizes =
    size === 'xs'
      ? `px-1 py-0.5 text-xs`
      : size === 'sm'
      ? `px-2 py-1 text-sm`
      : size === 'md'
      ? `px-3 py-2 text-lg`
      : size === 'lg'
      ? `px-4 py-3 text-2xl`
      : `px-2 py-1 lg:px-3 lg:py-3 `
  return (
    <button
      id={id}
      type={type}
      aria-label={text}
      title={title ? title : text ? text : ''}
      disabled={disabled}
      className={`block rounded font-semibold uppercase
      ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      ${buttonColors}
      ${buttonSizes}
      ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {text}
      {children}
    </button>
  )
}

export default Button
