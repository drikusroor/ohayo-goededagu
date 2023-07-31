import { useMemo } from 'react'

import extractVideoID from '../Article/components/helpers/extract-video-id'

const Video = ({ embedUrl = '' }) => {
  const formattedEmbedUrl = useMemo(() => {
    if (!embedUrl) return null

    const videoId = extractVideoID(embedUrl)
    if (!videoId) return null
    return `https://www.youtube.com/embed/${videoId}`
  }, [embedUrl])

  if (!formattedEmbedUrl) return null

  return (
    <div className="aspect-video bg-slate-300">
      <iframe
        src={formattedEmbedUrl}
        className="h-full w-full"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  )
}

export default Video
