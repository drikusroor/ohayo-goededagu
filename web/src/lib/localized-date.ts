export function dateStringToLocalizedDateString(date: string) {
  return new Date(date).toLocaleString('nl-NL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default dateStringToLocalizedDateString
