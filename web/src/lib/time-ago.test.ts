import dateToTimeAgo from './time-ago'

describe('dateToTimeAgo', () => {
  it('returns "just now" when the date is less than a minute ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 1000)
    expect(dateToTimeAgo(date)).toEqual('just now')
  })

  it('returns "1 min ago" when the date is 1 minute ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('1 min ago')
  })

  it('returns "2 min ago" when the date is 2 minutes ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 2 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('2 min ago')
  })

  it('returns "1 hour ago" when the date is 1 hour ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('1 hour ago')
  })

  it('returns "2 hours ago" when the date is 2 hours ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 2 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('2 hours ago')
  })

  it('returns "yesterday" when the date is 1 day ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('yesterday')
  })

  it('returns "2 days ago" when the date is 2 days ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('2 days ago')
  })

  it('returns "1 week ago" when the date is 1 week ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('1 week ago')
  })

  it('returns "2 weeks ago" when the date is 2 weeks ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 2 * 7 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('2 weeks ago')
  })

  it('returns "last month" when the date is 1 month ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 30.44 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('last month')
  })

  it('returns "2 months ago" when the date is 2 months ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 2 * 33.44 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('2 months ago')
  })

  it('returns "last year" when the date is 1 year ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 368.25 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('last year')
  })

  it('returns "2 years ago" when the date is 2 years ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 2 * 367.25 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('2 years ago')
  })
})
