import { BsArrowRightCircle } from 'react-icons/bs'
import type { Post } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'

import ArticleTypeIcon, {
  EPostType,
} from '../../ArticleTypeIcon/ArticleTypeIcon'
import Avatar from '../../Avatar/Avatar'

import ArticleArticle from './ArticleArticle'
import ArticleVideo from './ArticleVideo'

interface Props {
  article: Post
}

const ArticlePreview = ({ article }: Props) => {
  const onReadMore = (article: 'article') => {
    navigate(routes.article({ id: article.id }))
  }

  const border =
    article.type === EPostType.HAIKU
      ? `border-y-2 border-x-0 rounded-none`
      : article.type === EPostType.CHOTTO
      ? `border-dashed`
      : `border-solid`

  return (
    <article
      className={`rounded border-2 p-2 hover:cursor-pointer hover:border-black ${border}`}
      onClick={() => onReadMore(article)}
      tabIndex={0}
    >
      {article.type === EPostType.ARTICLE && (
        <ArticleArticle article={article} />
      )}

      {article.type === EPostType.VIDEO && <ArticleVideo article={article} />}

      {article.type != EPostType.ARTICLE && article.type != EPostType.VIDEO && (
        <>
          <header className="mb-3">
            <div className="mt-4 flex flex-row items-center gap-2 pl-1">
              <ArticleTypeIcon type={article.type as EPostType} />
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
          <div className="lg:mx-14">
            <div>
              {(article.type === EPostType.HAIKU ||
                article.type === EPostType.CHOTTO) && (
                <div className="justmt-2">{article.body}</div>
              )}

              <div className="flex flex-col gap-4 pt-8">
                <div className="flex flex-row items-center justify-between">
                  <div className="mb-2 flex flex-row items-center gap-2">
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
                        title={new Date(article.createdAt).toLocaleString(
                          'nl-NL',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      >
                        |{' '}
                        {new Date(article.createdAt).toLocaleDateString(
                          'nl-NL'
                        )}{' '}
                        {new Date(article.createdAt).toLocaleTimeString(
                          'nl-NL',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  {article.type === EPostType.VIDEO && article.body && (
                    <Button
                      className="flex items-center gap-2 px-4 py-3 text-xs"
                      onClick={() => onReadMore(article)}
                    >
                      <span className="hidden sm:inline-block">
                        Lees verder
                      </span>
                      <BsArrowRightCircle />
                    </Button>
                  )}
                </div>

                {article.type === EPostType.ARTICLE && (
                  <>
                    <div className="justmt-2 line-clamp-3">{article.body}</div>
                    <div className="flex justify-end">
                      <Button
                        className="flex max-w-fit items-center justify-end gap-2 px-4 py-3 text-xs"
                        onClick={() => onReadMore(article)}
                      >
                        <span className="hidden sm:inline-block">
                          Lees verder
                        </span>
                        <BsArrowRightCircle />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  )
}

export default ArticlePreview
