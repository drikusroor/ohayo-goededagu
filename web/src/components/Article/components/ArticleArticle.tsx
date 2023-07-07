import { BsArrowRightCircle } from 'react-icons/bs'
import type { Post } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'

import ArticleTypeIcon, {
  EPostType,
} from '../../ArticleTypeIcon/ArticleTypeIcon'
import Avatar from '../../Avatar/Avatar'

interface Props {
  article: Post
  type: EPostType
  date?: string
}

const ArticleArticle = ({ article, type, date }: Props) => {
  return (
    <>
      {type === EPostType.PREVIEW && (
        <section className="rounded bg-gray-600 bg-[url('https://cdn.cheapoguides.com/wp-content/uploads/sites/2/2020/05/akihabara-iStock-484915982-1024x683.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply">
          <div className="mx-auto max-w-screen-xl px-4 py-20 md:py-24 lg:py-56">
            <div className="flex flex-row items-center justify-center gap-2 pb-2">
              <div>
                <ArticleTypeIcon type={article.type as EPostType} />
              </div>

              <h1 className="flex flex-wrap items-center justify-center text-3xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
                {article.title}
              </h1>
            </div>
            <p className="mb-8 line-clamp-3 text-center text-lg font-normal text-gray-300 sm:px-16 lg:px-48 lg:text-xl">
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
                  onClick={() => navigate(routes.article({ id: article.id }))}
                >
                  <span className="hidden sm:inline-block">Lees verder</span>
                  <BsArrowRightCircle />
                </Button>
              </a>
            </div>
          </div>
        </section>
      )}

      {type === EPostType.FULL && (
        <>
          <section className="mb-4 rounded bg-gray-400 bg-[url('https://a.cdn-hotels.com/gdcs/production8/d946/61ea3fbe-d21e-4b09-a90f-9c6ac0f82e99.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply">
            <div className="mx-auto flex aspect-video max-w-screen-xl flex-col justify-end px-4">
              <div className="flex flex-row items-center justify-start gap-2 pb-2">
                <div>
                  <ArticleTypeIcon type={article.type as EPostType} />
                </div>
                <h1 className="flex items-center gap-2 text-3xl font-extrabold uppercase leading-none tracking-tight text-white drop-shadow-xl md:gap-4 md:text-5xl lg:text-6xl">
                  {article.title}
                </h1>
              </div>
              <div className="mb-2 flex flex-row items-center gap-2">
                <span className="text-sm text-slate-200">
                  {article.user.name
                    ? article.user.name
                    : article.user.email
                    ? article.user.email
                    : 'Anonymous'}
                </span>
                <span className="text-sm text-slate-200"> | {date}</span>
              </div>
            </div>
          </section>
          <div> {article.body} </div>
        </>
      )}
    </>
  )
}

export default ArticleArticle
