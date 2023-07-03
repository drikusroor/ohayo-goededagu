function extractVideoID(url: string): string | null {
  // YouTube's short URL
  let regex = /^https?:\/\/youtu.be\/([a-zA-Z0-9_-]{11})/
  let result = regex.exec(url)

  // YouTube's regular URL
  if (!result) {
    regex = /^https?:\/\/(?:www\.)?youtube.com\/.*[?&]v=([^&]+)/i
    result = regex.exec(url)
  }

  // YouTube's embed URL
  if (!result) {
    regex = /^https?:\/\/(?:www\.)?youtube.com\/embed\/([a-zA-Z0-9_-]{11})/
    result = regex.exec(url)
  }

  // YouTube's user URL
  if (!result) {
    regex =
      /^https?:\/\/(?:www\.)?youtube.com\/user\/[^/]+#p\/u\/\d+\/([a-zA-Z0-9_-]{11})/
    result = regex.exec(url)
  }

  return result && result[1] ? result[1] : null
}

export default extractVideoID
