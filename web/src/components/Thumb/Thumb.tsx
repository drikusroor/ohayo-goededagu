import Button from '../Button/Button'

interface IThumbProps {
  up: boolean
  active?: boolean
  count: number
}

const Thumb = ({ up, active, count }: IThumbProps) => {
  return (
    <Button className={active ? 'border-2 border-black' : ''}>
      {up ? 'Up' : 'Down'} {count}
    </Button>
  )
}

export default Thumb
