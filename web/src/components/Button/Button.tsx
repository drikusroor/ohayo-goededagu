interface ButtonProps {
  onClick?: () => void
  className?: string
  color?: 'cobalt-blue' | 'monza-red' | ''
  children?: React.ReactNode
  text?: string
}

const Button = ({
  onClick,
  className = '',
  color = '',
  text = '',
  children,
}: ButtonProps) => {
  return (
    <button
      className={`block rounded bg-cobalt-blue px-3 py-2 text-xs font-semibold uppercase text-white transition hover:brightness-110 hover:filter
      ${color ? `bg-${color}` : ''}
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
