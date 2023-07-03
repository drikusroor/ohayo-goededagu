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

  return (
    <article
      className="mb-4 rounded border-2 p-2 hover:cursor-pointer hover:border-black"
      onClick={() => onReadMore(article)}
      tabIndex={0}
    >
      <header className="mb-3">
        <div className="mt-4 flex flex-row items-center gap-4">
          <ArticleTypeIcon type={article.type as EPostType} />
          <h2
            className="text-2xl font-semibold text-slate-700"
            title={article.title}
          >
            <Link to={routes.article({ id: article.id })}>{article.title}</Link>
          </h2>
        </div>
      </header>
      <div className="md:ml-14">
        <div>
          {article.type === EPostType.VIDEO && (
            <ArticleVideo videoPost={article.videoPost} />
          )}

          <div className="flex flex-col gap-4 pt-8">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center gap-2">
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
              {article.type === EPostType.VIDEO && article.body && (
                <Button
                  className="flex items-center gap-2 px-4 py-3 sm:text-xs "
                  onClick={() => onReadMore(article)}
                >
                  Lees blog
                  <BsSearch />
                </Button>
              )}
            </div>

            {article.type != EPostType.VIDEO && (
              <div className="justmt-2">{article.body}</div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default ArticlePreview
