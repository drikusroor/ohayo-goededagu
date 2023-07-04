import { useMemo } from 'react'

import extractVideoID from './helpers/extract-video-id'

interface Props {
  videoPost: {
    videoUrl: string
  }
}

const ArticleVideo = ({ videoPost }: Props) => {
  const embedUrl = useMemo(() => {
    const videoId = extractVideoID(videoPost?.videoUrl)
    if (!videoId) return null
    return `https://www.youtube.com/embed/${videoId}`
  }, [videoPost?.videoUrl])

  if (!embedUrl) return null

  return (
    <div className="aspect-video max-w-2xl bg-slate-300">
      <iframe
        src={embedUrl}
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

export default ArticleVideo
