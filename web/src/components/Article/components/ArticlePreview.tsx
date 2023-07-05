import { BsSearch } from 'react-icons/bs'
import type { Post } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'

import ArticleTypeIcon, {
  EPostType,
} from '../../ArticleTypeIcon/ArticleTypeIcon'
import Avatar from '../../Avatar/Avatar'

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
        <section className="rounded bg-gray-600 bg-[url('https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2020/05/akihabara-iStock-484915982-1024x683.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply">
          <div className="mx-auto max-w-screen-xl px-4 py-24 text-center lg:py-56">
            <h1 className="mb-4 flex items-center justify-center gap-2 text-3xl font-extrabold leading-none tracking-tight text-white md:gap-4 md:text-5xl lg:text-6xl">
              <ArticleTypeIcon type={article.type as EPostType} />
              {article.title}
            </h1>
            <p className="mb-8 line-clamp-3 text-lg font-normal text-gray-300 sm:px-16 lg:px-48 lg:text-xl">
              {article.body}
            </p>
            <div className="flex flex-row items-center justify-center gap-12">
              <div className="flex flex-row items-center gap-2">
                <Avatar
                  src={article.user?.profile?.avatar}
                  alt={article.user.name}
                  name={article.user.name || article.user.email}
                />
                <div className="flex flex-col items-start">
                  <span
                    className="text-sm text-slate-300"
                    title={article.user.name || article.user.email}
                  >
                    {article.user.name
                      ? article.user.name
                      : article.user.email
                      ? article.user.email
                      : 'Anonymous'}
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
              <a
                href="#"
                className="items-center justify-end text-center text-base font-medium text-white focus:ring-4 focus:ring-gray-400"
              >
                <Button
                  className="flex max-w-fit items-center justify-end gap-2 px-4 py-3 text-xs"
                  onClick={() => onReadMore(article)}
                >
                  <span className="hidden sm:inline-block">Lees verder</span>
                  <BsSearch />
                </Button>
              </a>
            </div>
          </div>
        </section>
      )}

      {article.type != EPostType.ARTICLE && (
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
              {article.type === EPostType.VIDEO && (
                <ArticleVideo videoPost={article.videoPost} />
              )}

              {article.type === EPostType.ARTICLE && (
                <img
                  alt="cover"
                  className="aspect-video w-full object-cover"
                  src="https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2020/05/akihabara-iStock-484915982-1024x683.jpg"
                />
              )}

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
                      <BsSearch />
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
                        <BsSearch />
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
