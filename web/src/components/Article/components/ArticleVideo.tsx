import { useMemo } from 'react'

interface Props {
  videoPost: {
    videoUrl: string
  }
}

const ArticleVideo = ({ videoPost }: Props) => {
  const embedUrl = useMemo(() => {
    return videoPost?.videoUrl.replace('/live/', '/embed/')
  }, [videoPost?.videoUrl])

  if (!embedUrl) return null

  return (
    <div className="aspect-video">
      <iframe
        width="560"
        height="315"
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  )
}

export default ArticleVideo
