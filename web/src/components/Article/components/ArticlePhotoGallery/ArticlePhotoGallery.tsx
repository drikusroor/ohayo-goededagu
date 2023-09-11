import { BsArrowRightCircle } from 'react-icons/bs'
import { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import ArticleCommentCountBadge from 'src/components/ArticleCommentCountBadge/ArticleCommentCountBadge'
import ArticleTypeIcon, {
  EPostType,
} from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import Avatar from 'src/components/Avatar/Avatar'
import Button from 'src/components/Button/Button'
import PhotoGrid from 'src/components/PhotoGrid/PhotoGrid'
import { formatCreatedDate } from 'src/lib/formatters'
import { EPostDisplayType } from 'src/types/post-display-type.enum'

interface Props {
  article: Post
  displayType: EPostDisplayType
  date?: string
}

const ArticlePhotoGallery = ({ article, displayType, date }: Props) => {
  const authorName =
    article.user?.profile?.name || article.user?.name || 'Anonymous'

  const { imageGalleries = [] } = article

  const galleries = imageGalleries.reduce((acc, galleryOnPost) => {
    const { imageGallery } = galleryOnPost
    if (imageGallery) {
      return [...acc, imageGallery]
    }
    return acc
  }, [])

  if (!article) {
    throw new Error('Could not load article')
  }

  return (
    <>
      {displayType === EPostDisplayType.PREVIEW && (
        <>
          <div className="relative">
            {galleries.map((gallery, index) => (
              <PhotoGrid
                key={index}
                images={gallery.images}
                preview={true}
                className="block h-full w-full"
              />
            ))}
            <div className="font-3xl lg:min-h-48 min-h-20 md:min-h-24 absolute bottom-0 z-10 mx-auto flex h-full w-full flex-col justify-center rounded-md bg-gray-600 bg-opacity-50 px-4 text-center text-white text-opacity-100">
              <div className="flex flex-row items-center justify-center gap-2 pb-2">
                <div>
                  <ArticleTypeIcon type={article.type as EPostType} />
                </div>

                <h1 className="flex flex-wrap items-center justify-center text-3xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
                  {article.title}
                </h1>
              </div>
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
                    {formatCreatedDate(article.createdAt)}
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
                    <span className="hidden sm:inline-block">
                      Zie alle foto's
                    </span>
                    <BsArrowRightCircle />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      {displayType === EPostDisplayType.FULL && (
        <>
          <header className="mb-4 flex flex-col gap-1">
            <h1 className="flex items-center gap-2 text-3xl font-extrabold uppercase tracking-tight md:gap-4">
              <ArticleTypeIcon type={article.type as EPostType} />
              {article.title}
            </h1>
            <div className="flex flex-row items-center gap-2">
              <span className="text-sm text-slate-500">{authorName}</span>
              <span className="text-sm text-slate-500"> | {date}</span>
            </div>
          </header>
          <div> {article.body} </div>
          {galleries.map((gallery, index) => (
            <PhotoGrid
              key={index}
              images={gallery.images}
              preview={false}
              className="block h-full w-full"
            />
          ))}
        </>
      )}
    </>
  )
}

export default ArticlePhotoGallery
