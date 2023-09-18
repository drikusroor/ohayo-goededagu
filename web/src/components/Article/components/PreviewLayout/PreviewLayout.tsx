import { BsArrowRightCircle } from 'react-icons/bs'
import { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import ArticleCommentCountBadge from 'src/components/ArticleCommentCountBadge/ArticleCommentCountBadge'
import ArticleTypeIcon, {
  EPostType,
} from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import Avatar from 'src/components/Avatar/Avatar'
import AvatarTimestamp from 'src/components/Avatar/AvatarTimestamp/AvatarTimestamp'
import Button from 'src/components/Button/Button'
import DisplayDatetime from 'src/components/DisplayDatetime/DisplayDatetime'
import RenderBody from 'src/components/RenderBody/RenderBody'

interface Props {
  article: Post
  authorName: string
}

const PreviewLayout = ({ article, authorName }: Props) => {
  const hasImage =
    article.type === EPostType.ARTICLE ||
    article.type === EPostType.PHOTO_GALLERY

  console.log('article.type', article.type)
  console.log('hasImage', hasImage)

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
              className="!prose-invert mx-auto mb-8  line-clamp-3 text-center"
            />
          )}
          <div className="flex flex-row items-center justify-center gap-12">
            <div className="flex flex-row items-center gap-2">
              <Avatar
                src={article.user?.profile?.avatar}
                alt={article.user.name}
                name={article.user.name || article.user.email}
                userId={article.user?.id}
              />
              <div className="flex flex-col items-start">
                <span className="text-sm text-slate-300" title={authorName}>
                  {authorName}
                </span>
                <DisplayDatetime
                  className="text-sm text-slate-300"
                  datetime={article.createdAt}
                />
              </div>
            </div>
            {article?.comments?.length > 0 && (
              <ArticleCommentCountBadge count={article.comments.length} />
            )}
            <Link
              to={routes.article({ id: article.id })}
              className="items-center justify-end text-center text-base font-medium text-white focus:ring-4 focus:ring-gray-400"
            >
              <Button className="flex max-w-fit items-center justify-end gap-2 px-4 py-3 text-xs">
                {article.type === EPostType.PHOTO_GALLERY && (
                  <span className="hidden sm:inline-block">
                    Zie alle foto&apos;s
                  </span>
                )}
                {article.type === EPostType.ARTICLE && (
                  <span className="hidden sm:inline-block">Lees verder</span>
                )}
                <BsArrowRightCircle />
              </Button>
            </Link>
          </div>
        </>
      )}
      {!hasImage && (
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
              <div className="justmt-2 line-clamp-5">
                <RenderBody body={article.body} />
              </div>
              <div className="flex items-center justify-between pt-4">
                <AvatarTimestamp article={article} />
                {article?.comments?.length > 0 && (
                  <ArticleCommentCountBadge
                    count={article.comments.length}
                    variant="dark"
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
