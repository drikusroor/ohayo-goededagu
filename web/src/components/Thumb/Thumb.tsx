import Button from '../Button/Button'

interface IThumbProps {
  up: boolean
  active?: boolean
  count: number
  onClick: () => void
}

const Thumb = ({ up, active, count, onClick }: IThumbProps) => {
  return (
    <Button className={active ? 'border-2 border-black' : ''} onClick={onClick}>
      {up ? '👍' : '👎'} {count}
    </Button>
  )
}

export default Thumb
