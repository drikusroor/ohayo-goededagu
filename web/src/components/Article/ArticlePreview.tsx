import { useCallback } from 'react'

import type { Post } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'

import Avatar from '../Avatar/Avatar'

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
      tabIndex={0}
    >
      <header className="mb-3">
        <div className="flex flex-row items-center gap-4">
          <Avatar
            src={article.user?.profile?.avatar}
            alt={article.user.name}
            name={article.user.name || article.user.email}
          />
          <div>
            <span
              className="text-sm text-slate-500"
              title={article.user.name || article.user.email}
            >
              {article.user.name
                ? article.user.name
                : article.user.email
                ? article.user.email
                : 'Anonymous'}
            </span>
            <span
              className="ml-2 text-sm text-slate-500"
              title={new Date(article.createdAt).toLocaleString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            >
              | {new Date(article.createdAt).toLocaleDateString('nl-NL')}{' '}
              {new Date(article.createdAt).toLocaleTimeString('nl-NL', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-row items-center gap-4">
          <Avatar alt={article.type[0]} name={article.type} />
          <h2
            className="text-2xl font-semibold text-slate-700"
            title={article.title}
          >
            <Link to={routes.article({ id: article.id })}>{article.title}</Link>
          </h2>
        </div>
      </header>
      <div className="ml-14">{article.body}</div>
    </article>
  )
}

export default ArticlePreview
