import { BsArrowRightCircle } from 'react-icons/bs'
import { Post } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'

import ArticleCommentCountBadge from 'src/components/ArticleCommentCountBadge/ArticleCommentCountBadge'
import ArticleTypeIcon, {
  EPostType,
} from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import AvatarTimestamp from 'src/components/Avatar/AvatarTimestamp/AvatarTimestamp'
import Button from 'src/components/Button/Button'
import RenderBody from 'src/components/RenderBody/RenderBody'
import Video from 'src/components/Video/Video'

interface Props {
  article: Post
}

const PreviewLayout = ({ article }: Props) => {
  const hasImage =
    article.type === EPostType.ARTICLE ||
    article.type === EPostType.PHOTO_GALLERY

  return (
    <>
      {hasImage && (
        <>
          <div className="flex flex-row items-center justify-center gap-2 pb-4">
            <div>
              <ArticleTypeIcon type={article.type as EPostType} />
            </div>
            <h1 className="flex flex-wrap items-center justify-center text-3xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
              {article.title}
            </h1>
          </div>
          {article.type === EPostType.ARTICLE && (
            <RenderBody
              body={article.body}
              className="prose mx-auto mb-8 line-clamp-3 max-h-[4.5rem] text-center text-[#d1d5db] md:max-h-[5.5rem] lg:max-h-24"
            />
          )}
          <div className="flex flex-row items-center justify-center gap-12">
            <AvatarTimestamp article={article} hasImage={hasImage} />
            {article?.comments?.length > 0 && (
              <ArticleCommentCountBadge count={article.comments.length} />
            )}
            <Link
              to={routes.article({ id: article.id })}
              className="items-center justify-end text-center text-base font-medium text-white focus:ring-4 focus:ring-gray-400"
            >
              <Button
                text={
                  article.type === EPostType.PHOTO_GALLERY
                    ? "Zie alle foto's"
                    : 'Lees verder'
                }
                icon={<BsArrowRightCircle />}
                className="flex max-w-fit items-center justify-end gap-2 px-4 py-3 text-xs"
              />
            </Link>
          </div>
        </>
      )}
      {!hasImage && (
        <>
          <header className="mb-3 flex flex-row justify-between">
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
            <div className="flex flex-row content-start justify-end gap-2 p-2">
              {article.title && article.body && (
                <span className="group relative flex items-center gap-2 text-lg ">
                  🇳🇱
                  <span className="user-select-none absolute bottom-full right-0 mb-2 w-52 rounded-md border-2 border-slate-200 bg-white p-2 text-left text-xs text-slate-500 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                    Beschikbaar in Nederlands
                  </span>
                </span>
              )}
              {article.titleEn && article.bodyEn && (
                <span className="group relative flex items-center gap-2 text-lg ">
                  🇬🇧
                  <span className="user-select-none absolute bottom-full right-0 mb-2 w-32 rounded-md border-2 border-slate-200 bg-white p-2 text-left text-xs text-slate-500 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                    Available in English
                  </span>
                </span>
              )}
            </div>
          </header>

          {article.type === EPostType.VIDEO && (
            <Video embedUrl={article?.videoPost?.videoUrl} />
          )}

          <div
            className={article.type != EPostType.VIDEO ? 'lg:mx-16' : 'lg:mx-0'}
          >
            {article.type != EPostType.VIDEO && (
              <div className="justmt-2 line-clamp-5">
                <RenderBody body={article.body} />
              </div>
            )}

            <div className="flex items-center justify-between pt-4">
              <AvatarTimestamp article={article} hasImage={hasImage} />
              <div className="flex items-center gap-6">
                {article?.comments?.length > 0 && (
                  <ArticleCommentCountBadge
                    count={article.comments.length}
                    variant="dark"
                  />
                )}
                {article.type === EPostType.VIDEO && article.body && (
                  <Button
                    text="Lees verder"
                    icon={<BsArrowRightCircle />}
                    className="flex items-center gap-2 px-4 py-3 text-xs"
                    onClick={() => navigate(routes.article({ id: article.id }))}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default PreviewLayout
