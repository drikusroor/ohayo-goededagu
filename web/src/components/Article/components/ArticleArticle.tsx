import { BsArrowRightCircle } from 'react-icons/bs'
import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import ArticleCommentCountBadge from 'src/components/ArticleCommentCountBadge/ArticleCommentCountBadge'
import Button from 'src/components/Button/Button'
import { EPostDisplayType } from 'src/types/post-display-type.enum'

import ArticleTypeIcon, {
  EPostType,
} from '../../ArticleTypeIcon/ArticleTypeIcon'
import Avatar from '../../Avatar/Avatar'

interface Props {
  article: Post
  displayType: EPostDisplayType
  date?: string
}

const ArticleArticle = ({ article, displayType, date }: Props) => {
  const { coverImage } = article

  const authorName =
    article.user.profile?.name || article.user.name || 'Anonymous'

  return (
    <>
      {displayType === EPostDisplayType.PREVIEW && (
        <section
          style={{
            backgroundImage: coverImage?.url ? `url(${coverImage.url})` : '',
          }}
          className="rounded bg-gray-600 bg-cover bg-center bg-no-repeat bg-blend-multiply"
        >
          <div className="mx-auto max-w-screen-xl px-4 py-20 md:py-24 lg:py-56">
            <div className="flex flex-row items-center justify-center gap-2 pb-2">
              <div>
                <ArticleTypeIcon type={article.type as EPostType} />
              </div>

              <h1 className="flex flex-wrap items-center justify-center text-3xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
                {article.title}
              </h1>
            </div>
            <p
              className="mb-8 line-clamp-3 text-center text-lg font-normal text-gray-300 sm:px-16 lg:px-48 lg:text-xl"
              dangerouslySetInnerHTML={{ __html: article.body }}
            ></p>
            <div className="flex flex-row items-center justify-center gap-12">
              <div className="flex flex-row items-center gap-2">
                <Avatar
                  src={article.user?.profile?.avatar}
                  alt={article.user.name}
                  name={article.user.name || article.user.email}
                />
                <div className="flex flex-col items-start">
                  <span className="text-sm text-slate-300" title={authorName}>
                    {authorName}
                  </span>
                  <span
                    className="text-sm text-slate-300"
                    title={new Date(article.createdAt).toLocaleString('nl-NL', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  >
                    {' '}
                    {new Date(article.createdAt).toLocaleDateString(
                      'nl-NL'
                    )}{' '}
                    {new Date(article.createdAt).toLocaleTimeString('nl-NL', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
              {article.comments.length > 0 && (
                <ArticleCommentCountBadge count={article.comments.length} />
              )}
              <Link
                to={routes.article({ id: article.id })}
                className="items-center justify-end text-center text-base font-medium text-white focus:ring-4 focus:ring-gray-400"
              >
                <Button className="flex max-w-fit items-center justify-end gap-2 px-4 py-3 text-xs">
                  <span className="hidden sm:inline-block">Lees verder</span>
                  <BsArrowRightCircle />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {displayType === EPostDisplayType.FULL && (
        <>
          <section
            style={{
              backgroundImage: coverImage?.url ? `url(${coverImage.url})` : '',
            }}
            className="rounded bg-gray-400 bg-cover bg-center bg-no-repeat bg-blend-multiply"
          >
            <div className="mx-auto flex aspect-video max-w-screen-xl flex-col justify-end px-4">
              <div className="flex flex-row items-center justify-start gap-2">
                <div>
                  <ArticleTypeIcon type={article.type as EPostType} />
                </div>
                <h1 className="flex items-center gap-2 text-3xl font-extrabold uppercase leading-none tracking-tight text-white drop-shadow-xl md:gap-4 md:text-5xl lg:text-6xl">
                  {article.title}
                </h1>
              </div>
              <div className="flex flex-row items-center gap-2 pb-2">
                <span className="text-sm text-slate-200">{authorName}</span>
                <span className="text-sm text-slate-200"> | {date}</span>
              </div>
            </div>
          </section>
          <div
            className="prose lg:prose-lg xl:prose-xl"
            dangerouslySetInnerHTML={{ __html: article.body }}
          ></div>
        </>
      )}
    </>
  )
}

export default ArticleArticle
