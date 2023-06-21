import { useCallback } from 'react'

import type { Post } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'

enum EPostType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
  HAIKU = 'HAIKU',
  CHOTTO = 'CHOTTO',
  PHOTO_GALLERY = 'PHOTO_GALLERY',
}

interface Props {
  article: Post
}

const ArticlePreview = ({ article }: Props) => {
  const onReadMore = (article: 'article') => {
    navigate(routes.article({ id: article.id }))
  }

  const getPostTypeImage = useCallback((type: Post['type']) => {
    switch (type) {
      case EPostType.ARTICLE:
        return '/images/post-types/article.png'
      case EPostType.VIDEO:
        return '/images/post-types/video.png'
      case EPostType.HAIKU:
        return '/images/post-types/haiku.png'
      case EPostType.PHOTO_GALLERY:
        return '/images/post-types/photo-gallery.png'
      case EPostType.CHOTTO:
        return '/images/post-types/chotto.png'
      default:
        return '/images/post-types/unknown.png'
    }
  }, [])

  const getFirstChar = useCallback((str: string) => {
    return str.charAt(0).toUpperCase()
  }, [])

  return (
    <article
      className="mb-4 rounded border-2 p-2 hover:cursor-pointer hover:border-black"
      onClick={() => onReadMore(article)}
    >
      <header className="mb-3">
        <h2 className="text-2xl">
          <Link to={routes.article({ id: article.id })}>{article.title}</Link>
        </h2>
        <div className="flex items-center gap-2">
          <img
            src={getPostTypeImage(article.type)}
            alt={getFirstChar(article.type)}
            width="32"
            height="32"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-300 text-slate-900"
            title={article.type}
          />
          <span className=" text-sm text-slate-500">
            Posted at: {new Date(article.createdAt).toLocaleString()}
          </span>
          <span className=" text-sm text-gray-400">
            {article.user.name
              ? `by ${article.user.name}`
              : article.user.email
              ? article.user.email
              : 'by Anonymous'}
          </span>
        </div>
      </header>
      video: {article.video}
      {article.video ? (
        <iframe
          width="560"
          height="315"
          src={article.video}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        <span>no video</span>
        // <></>
      )}
      <div>{article.body}</div>
    </article>
  )
}

export default ArticlePreview
