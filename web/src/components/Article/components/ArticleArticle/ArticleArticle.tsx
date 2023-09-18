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
import PreviewLayout from '../PreviewLayout/PreviewLayout'

interface Props {
  article: Post
  displayType: EPostDisplayType
}

const ArticleArticle = ({ article, displayType }: Props) => {
  const { coverImage } = article

  const { imageGalleries = [] } = article

  const galleries = imageGalleries.reduce((acc, galleryOnPost) => {
    const { imageGallery } = galleryOnPost
    if (imageGallery) {
      return [...acc, imageGallery]
    }
    return acc
  }, [])

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
            <PreviewLayout article={article} authorName={authorName} />
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
                <Link
                  to={
                    article.user?.id
                      ? routes.viewProfile({ id: article.user?.id })
                      : '#'
                  }
                  className="text-sm text-slate-200 hover:underline"
                  title={`View ${authorName}'s profile`}
                >
                  {authorName}
                </Link>
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
          {galleries &&
            galleries.map((gallery, index) => (
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

export default ArticleArticle
