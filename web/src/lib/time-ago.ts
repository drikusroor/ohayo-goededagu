export function dateToTimeAgo(date: Date): string {
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30.44) // Average days in a month
  const years = Math.floor(days / 365.25) // Taking into account leap years

  if (seconds < 60) {
    return 'zojuist'
  } else if (minutes === 1) {
    return '1 minuut geleden'
  } else if (minutes < 60) {
    return `${minutes} min ago`
  } else if (hours === 1) {
    return '1 uur geleden'
  } else if (hours < 24) {
    return `${hours} uur geleden`
  } else if (days === 1) {
    return 'gisteren'
  } else if (days < 7) {
    return `${days} dagen geleden`
  } else if (weeks === 1) {
    return '1 week geleden'
  } else if (weeks < 4) {
    return `${weeks} weken geleden`
  } else if (months <= 1) {
    return 'afgelopen maand'
  } else if (months < 12) {
    return `${months} maanden geleden`
  } else if (years === 1) {
    return 'afgelopen jaar'
  } else {
    return `${years} jaar geleden`
  }
}

export function dateStringToTimeAgo(date: string): string {
  return dateToTimeAgo(new Date(date))
}

export default dateToTimeAgo
