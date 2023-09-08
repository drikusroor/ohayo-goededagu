import { BsArrowRightCircle } from 'react-icons/bs'
import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import ArticleCommentCountBadge from 'src/components/ArticleCommentCountBadge/ArticleCommentCountBadge'
import Button from 'src/components/Button/Button'
import DisplayDatetime from 'src/components/DisplayDatetime/DisplayDatetime'
import LocationPin from 'src/components/LocationPin/LocationPin'
import PhotoGrid from 'src/components/PhotoGrid/PhotoGrid'
import RenderBody from 'src/components/RenderBody/RenderBody'
import { EPostDisplayType } from 'src/types/post-display-type.enum'

import ArticleTypeIcon, {
  EPostType,
} from '../../../ArticleTypeIcon/ArticleTypeIcon'
import Avatar from '../../../Avatar/Avatar'

interface Props {
  article: Post
  displayType: EPostDisplayType
}

const ArticleArticle = ({ article, displayType }: Props) => {
  const { coverImage } = article

  const authorName =
    article?.user?.profile?.name || article?.user?.name || 'Anonymous'

  return (
    <>
      {displayType === EPostDisplayType.PREVIEW && (
        <section
          style={{
            backgroundImage: coverImage?.url
              ? `url(${coverImage.url})`
              : `url(/images/logo-full.png)`,
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
            <RenderBody
              body={article.body}
              className="!prose-invert mx-auto mb-8  line-clamp-3 text-center"
            />
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
              backgroundImage: coverImage?.url
                ? `url(${coverImage.url})`
                : `url(/images/logo-full.png)`,
            }}
            className="rounded bg-gray-400 bg-cover bg-center bg-no-repeat bg-blend-multiply"
          >
            <div className="flex aspect-video max-w-screen-xl flex-col justify-end px-4">
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
                <DisplayDatetime
                  datetime={article.createdAt}
                  showDate={true}
                  className="text-sm text-slate-200"
                />
                <LocationPin
                  location={article.location}
                  className="text-white"
                />
              </div>
            </div>
          </section>
          <div>
            <RenderBody body={article.body} />
          </div>
          {article?.imageGalleries?.imageGallery?.images && (
            <PhotoGrid images={article?.imageGalleries?.imageGallery?.images} />
          )}
        </>
      )}
    </>
  )
}

export default ArticleArticle
