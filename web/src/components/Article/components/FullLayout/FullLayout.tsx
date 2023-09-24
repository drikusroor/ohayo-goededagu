import type { Post } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'

import DisplayDatetime from 'src/components/DisplayDatetime/DisplayDatetime'
import LocationPin from 'src/components/LocationPin/LocationPin'
import PhotoGrid from 'src/components/PhotoGrid/PhotoGrid'
import PostThumbsCell from 'src/components/PostThumbsCell'
import RenderBody from 'src/components/RenderBody/RenderBody'
import Video from 'src/components/Video/Video'
import { useWindowDimensions } from 'src/lib/formatters'
import Person from 'src/pages/AboutPage/Person'

import ArticleTypeIcon, {
  EPostType,
} from '../../../ArticleTypeIcon/ArticleTypeIcon'

interface Props {
  article: Post
}

const FullLayout = ({ article }: Props) => {
  const { width } = useWindowDimensions()
  const isMobile = width < 428

  const authorName =
    article?.user?.profile?.name || article?.user?.name || 'Anonymous'

  const hasCoverImage = article.coverImage != null

  const { imageGalleries = [] } = article
  const galleries = imageGalleries.reduce((acc, galleryOnPost) => {
    const { imageGallery } = galleryOnPost
    if (imageGallery) {
      return [...acc, imageGallery]
    }
    return acc
  }, [])

  return (
    <>
      {hasCoverImage && (
        <section
          style={{
            backgroundImage: article.coverImage?.url
              ? `url(${article.coverImage.url})`
              : `url(/images/logo-full.png)`,
          }}
          className="relative rounded bg-gray-400 bg-cover bg-center bg-no-repeat bg-blend-multiply"
        >
          <div className="flex aspect-video max-w-screen-xl flex-col justify-end gap-2 px-4">
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
                showDate={isMobile ? false : true}
                className="text-sm text-slate-200"
              />
              <LocationPin
                location={article.location}
                className="pb-1 text-white"
              />
            </div>
            <div className="absolute bottom-2 right-2 rounded bg-slate-300 bg-opacity-70 p-1">
              <PostThumbsCell postId={article.id} />
            </div>
          </div>
        </section>
      )}

      {!hasCoverImage && (
        <>
          <header className="mb-4 flex flex-col gap-1">
            <div className="flex flex-row justify-between gap-2">
              <h1 className="flex items-center gap-2 text-3xl font-extrabold uppercase tracking-tight md:gap-4">
                <ArticleTypeIcon type={article.type as EPostType} />
                {article.title}
              </h1>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-2">
                <Link
                  to={
                    article.user?.id
                      ? routes.viewProfile({ id: article.user?.id })
                      : '#'
                  }
                  className="text-sm text-slate-500 hover:underline"
                  title={`View ${authorName}'s profile`}
                >
                  {authorName}
                </Link>{' '}
                <DisplayDatetime
                  datetime={article.createdAt}
                  showDate={true}
                  className="text-sm text-slate-500"
                />
                <LocationPin
                  location={article.location}
                  className="pb-1 text-slate-500"
                />
              </div>
              <PostThumbsCell postId={article.id} />
            </div>
          </header>
        </>
      )}

      <div className="w-full">
        {article.videoPost != null && (
          <Video embedUrl={article?.videoPost?.videoUrl} />
        )}
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

      <div
        onClick={() =>
          article.user.id
            ? navigate(routes.viewProfile({ id: article.user.id }))
            : '#'
        }
        onKeyDown={() =>
          article.user.id
            ? navigate(routes.viewProfile({ id: article.user.id }))
            : '#'
        }
        tabIndex={0}
        role="button"
        key={article.user.id}
        className="pt-10"
      >
        <Person
          profile={article?.user?.profile}
          style="cursor-pointer hover:border-black"
        />
      </div>
    </>
  )
}

export default FullLayout
