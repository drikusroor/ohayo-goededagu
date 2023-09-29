interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  id?: string
  className?: string
  color?: 'cobalt-blue' | 'monza-red' | ''
  size?: 'xs' | 'sm' | 'md' | 'lg' | ''
  icon?: React.ReactNode
  children?: React.ReactNode
  text?: string
  title?: string
  textStay?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'filled' | 'outlined' | ''
}

function getButtonSize(size: 'xs' | 'sm' | 'md' | 'lg' | ''): string {
  switch (size) {
    case 'xs':
      return 'p-1.5 text-xs'
    case 'sm':
      return 'text-xs'
    case 'md':
      return 'text-sm'
    case 'lg':
      return 'text-base'
    default:
      return 'text-sm'
  }
}

function getIconSize(size: 'xs' | 'sm' | 'md' | 'lg' | ''): string {
  switch (size) {
    case 'xs':
      return 'text-xs'
    case 'sm':
      return 'text-sm'
    case 'md':
      return 'text-base'
    case 'lg':
      return 'text-lg'
    default:
      return 'text-base'
  }
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
  icon,
  disabled,
  textStay,
  type = 'button',
  variant: variant = 'filled',
  ...props
}: IButtonProps) => {
  const theme = color || 'cobalt-blue'

  const buttonColors =
    variant === 'filled'
      ? `bg-${theme}-600 text-white transition hover:bg-${theme}-500 hover:filter`
      : `border-${theme}-500 text-${theme}-500 hover:bg-${theme}-500 hover:text-white transition-colors`

  const buttonSizes = getButtonSize(size)

  const iconSizes = getIconSize(size)

  return (
    <button
      id={id}
      type={type}
      aria-label={text}
      title={title ? title : text ? text : ''}
      disabled={disabled}
      className={`flex flex-row items-center gap-1 rounded p-2 font-semibold uppercase
      ${disabled ? 'cursor-not-allowed opacity-50' : ''}
      ${buttonColors}
      ${buttonSizes}
      ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {icon && <span className={`${iconSizes}`}>{icon}</span>}
      {text && (
        <span
          className={
            icon && !textStay ? `hidden sm:inline-block` : 'inline-block'
          }
        >
          {text}
        </span>
      )}
      {children}
    </button>
  )
}

export default Button
