import { useMemo } from 'react'

import { BsArrowRightCircle } from 'react-icons/bs'
import { Post } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'

import ArticleCommentCountBadge from 'src/components/ArticleCommentCountBadge/ArticleCommentCountBadge'
import ArticleTypeIcon, {
  EPostType,
} from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import AvatarTimestamp from 'src/components/Avatar/AvatarTimestamp/AvatarTimestamp'
import Button from 'src/components/Button/Button'

import extractVideoID from './helpers/extract-video-id'

interface Props {
  article: Post
  type: EPostType
  date?: string
}

const ArticleVideo = ({ article, type, date }: Props) => {
  const embedUrl = useMemo(() => {
    const videoId = extractVideoID(article?.videoPost?.videoUrl)
    if (!videoId) return null
    return `https://www.youtube.com/embed/${videoId}`
  }, [article?.videoPost?.videoUrl])

  if (!embedUrl) return null

  return (
    <>
      {type === EPostType.PREVIEW && (
        <>
          <header className="mb-3">
            <div className="mt-4 flex flex-row items-center gap-2 pl-1">
              <ArticleTypeIcon type={EPostType.VIDEO} />
              <h2
                className="text-xl font-semibold text-slate-700 md:text-2xl"
                title={article.title}
              >
                <Link to={routes.article({ id: article.id })}>
                  {article.title}
                </Link>
              </h2>
            </div>
          </header>
          <div className="aspect-video bg-slate-300">
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
          <div className="flex flex-row items-center justify-between pt-4">
            <AvatarTimestamp article={article} />
            <ArticleCommentCountBadge count={article.comments.length} />
            {article.body && (
              <Button
                className="flex items-center gap-2 px-4 py-3 text-xs"
                onClick={() => navigate(routes.article({ id: article.id }))}
              >
                <span className="hidden sm:inline-block">Lees verder</span>
                <BsArrowRightCircle />
              </Button>
            )}
          </div>
        </>
      )}

      {type === EPostType.FULL && (
        <>
          <header className="flex flex-col gap-1">
            <h1 className="flex items-center gap-2 text-3xl font-extrabold uppercase tracking-tight md:gap-4">
              <ArticleTypeIcon type={article.type as EPostType} />
              {article.title}
            </h1>

            <div className="flex flex-row items-center gap-2">
              <span className="text-sm text-slate-500">
                {article.user.profile.name
                  ? article.user.profile.name
                  : article.user.name
                  ? article.user.name
                  : article.user.email
                  ? article.user.email
                  : 'Anonymous'}
              </span>
              <span className="text-sm text-slate-500"> | {date}</span>
            </div>
          </header>
          <div className="aspect-video bg-slate-300">
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
          <div> {article.body} </div>
        </>
      )}
    </>
  )
}

export default ArticleVideo
