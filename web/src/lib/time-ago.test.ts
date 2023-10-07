import dateToTimeAgo from './time-ago'

describe('dateToTimeAgo', () => {
  it('returns "zojuist" when the date is less than a minute ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 1000)
    expect(dateToTimeAgo(date)).toEqual('just now')
  })

  it('returns "1 minuut geleden" when the date is 1 minute ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('1 minuut geleden')
  })

  it('returns "2 minuten geleden" when the date is 2 minutes ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 2 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('2 minuten geleden')
  })

  it('returns "1 uur geleden" when the date is 1 hour ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('1 uur geleden')
  })

  it('returns "2 uur geleden" when the date is 2 hours ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 2 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('2 uur geleden')
  })

  it('returns "gisteren" when the date is 1 day ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('gisteren')
  })

  it('returns "2 dagen geleden" when the date is 2 days ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('2 dagen geleden')
  })

  it('returns "1 week geleden" when the date is 1 week ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('1 week geleden')
  })

  it('returns "2 weken geleden" when the date is 2 weeks ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 2 * 7 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('2 weken geleden')
  })

  it('returns "afgelopen maand" when the date is 1 month ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 30.44 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('afgelopen maand')
  })

  it('returns "2 maanden geleden" when the date is 2 months ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 2 * 33.44 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('2 maanden geleden')
  })

  it('returns "afgelopen jaar" when the date is 1 year ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 368.25 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('afgelopen jaar')
  })

  it('returns "2 jaar geleden" when the date is 2 years ago', () => {
    const now = new Date()
    const date = new Date(now.getTime() - 2 * 367.25 * 24 * 60 * 60 * 1000)
    expect(dateToTimeAgo(date)).toEqual('2 jaar geleden')
  })
})
