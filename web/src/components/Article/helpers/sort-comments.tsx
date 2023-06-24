function epochSeconds(date: Date): number {
  const epoch = new Date(Date.UTC(1970, 0, 1))
  const diff = date.getTime() - epoch.getTime()

  return Math.floor(diff / 1000)
}

export function hotScore(
  upvotes: number,
  downvotes: number,
  createdAt: Date,
  upvoteWeight = 1,
  downvoteWeight = 0.5,
  timeWeight = 0.00001
): number {
  const s = upvoteWeight * upvotes - downvoteWeight * downvotes
  const seconds = epochSeconds(createdAt) - 1134028003
  const timeScore = seconds * timeWeight
  return s + timeScore
}
