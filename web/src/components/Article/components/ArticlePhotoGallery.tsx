import { BsArrowRightCircle } from 'react-icons/bs'
import { Post } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'

import ArticleCommentCountBadge from 'src/components/ArticleCommentCountBadge/ArticleCommentCountBadge'
import ArticleTypeIcon, {
  EPostType,
} from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import AvatarTimestamp from 'src/components/Avatar/AvatarTimestamp/AvatarTimestamp'
import Button from 'src/components/Button/Button'
import PhotoGrid from 'src/components/PhotoGrid/PhotoGrid'
import { EPostDisplayType } from 'src/types/post-display-type.enum'

interface Props {
  article: Post
  displayType: EPostDisplayType
  date?: string
}

const ArticlePhotoGallery = ({ article, displayType, date }: Props) => {
  console.log('photo gallery', displayType, article)
  const authorName =
    article.user?.profile?.name || article.user?.name || 'Anonymous'

  return (
    <>
      <br />
      {displayType === EPostDisplayType.PREVIEW && (
        <>
          <header className="mb-3">
            <div className="mt-4 flex flex-row items-center gap-2 pl-1">
              <ArticleTypeIcon type={EPostType.PHOTO_GALLERY} />
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

          <div className="flex flex-row items-center justify-between pt-4">
            <AvatarTimestamp article={article} />
            <div className="flex items-center gap-6">
              {article?.comments?.length > 0 && (
                <ArticleCommentCountBadge
                  count={article.comments.length}
                  variant="dark"
                />
              )}
              {article.body && (
                <Button
                  className="flex items-center gap-2 px-4 py-3 text-xs"
                  onClick={() => navigate(routes.article({ id: article.id }))}
                >
                  <span className="hidden sm:inline-block">Lees verder</span>
                  <BsArrowRightCircle />
                </Button>
              )}
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
          {article?.photoGallery && (
            <PhotoGrid photoGallery={article?.photoGallery} />
          )}
        </>
      )}
    </>
  )
}

export default ArticlePhotoGallery
