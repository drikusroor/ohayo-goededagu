import { render } from '@redwoodjs/testing/web'

import WorldClock from './WorldClock'

describe('WorldClock Component', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<WorldClock />)
    }).not.toThrow()
  })

  it('should display "We zijn in Nederland! 🇳🇱" before September 30', () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-09-29T00:00:00.000Z'))
    const { getByText } = render(<WorldClock />)
    expect(getByText('We zijn in Nederland! 🇳🇱')).toBeInTheDocument()
  })

  it('should display "We zijn onderweg naar Japan! ✈️" between September 30 and October 1', () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-09-30T00:00:00.000Z'))
    const { getByText } = render(<WorldClock />)
    expect(getByText('We zijn onderweg naar Japan! ✈️')).toBeInTheDocument()
  })

  it('should display "We zijn in Tokyo!" between October 1 and October 5', () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-10-02T00:00:00.000Z'))
    const { getByText } = render(<WorldClock />)
    expect(getByText('We zijn in Tokyo!')).toBeInTheDocument()
  })

  it('should display "We zijn in Hakone!" between October 5 and October 7', () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-10-06T00:00:00.000Z'))
    const { getByText } = render(<WorldClock />)
    expect(getByText('We zijn in Hakone!')).toBeInTheDocument()
  })

  it('should display "We zijn in Kyoto!" between October 7 and October 11', () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-10-08T00:00:00.000Z'))
    const { getByText } = render(<WorldClock />)
    expect(getByText('We zijn in Kyoto!')).toBeInTheDocument()
  })

  it('should display "We zijn in Nagasaki!" between October 11 and October 14', () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-10-12T00:00:00.000Z'))
    const { getByText } = render(<WorldClock />)
    expect(getByText('We zijn in Nagasaki!')).toBeInTheDocument()
  })

  it('should display "We zijn in Osaka!" between October 14 and October 18', () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-10-15T00:00:00.000Z'))
    const { getByText } = render(<WorldClock />)
    expect(getByText('We zijn in Osaka!')).toBeInTheDocument()
  })

  it('should display "We zijn in Takayama!" between October 18 and October 21', () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-10-19T00:00:00.000Z'))
    const { getByText } = render(<WorldClock />)
    expect(getByText('We zijn in Takayama!')).toBeInTheDocument()
  })

  it('should display "We zijn in Tokyo!" between October 21 and October 27', () => {
    jest.useFakeTimers().setSystemTime(new Date('2023-10-22T00:00:00.000Z'))
    const { getByText } = render(<WorldClock />)
    expect(getByText('We zijn in Tokyo!')).toBeInTheDocument()
  })
})
