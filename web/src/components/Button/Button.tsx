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
  const theme = color ? color : 'cobalt-blue'
  const buttonColors =
    variant === 'filled'
      ? `bg-${theme}-600 text-white transition hover:bg-${theme}-500 hover:filter`
      : `border-${theme}-500 text-${theme}-500 hover:bg-${theme}-500 hover:text-white transition-colors`
  const buttonSizes =
    size === 'xs'
      ? `p-1.5 text-xs`
      : size === 'sm'
      ? `text-xs`
      : size === 'md'
      ? `text-sm`
      : size === 'lg'
      ? `text-base`
      : `text-sm`
  const iconSizes =
    size === 'xs'
      ? `text-xs`
      : size === 'sm'
      ? `text-sm`
      : size === 'md'
      ? `text-base`
      : size === 'lg'
      ? `text-lg`
      : `text-base`

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
