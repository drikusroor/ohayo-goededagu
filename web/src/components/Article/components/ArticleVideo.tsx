import { BsArrowRightCircle } from 'react-icons/bs'
import { Post } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'

import ArticleCommentCountBadge from 'src/components/ArticleCommentCountBadge/ArticleCommentCountBadge'
import ArticleTypeIcon, {
  EPostType,
} from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import AvatarTimestamp from 'src/components/Avatar/AvatarTimestamp/AvatarTimestamp'
import Button from 'src/components/Button/Button'
import DisplayDatetime from 'src/components/DisplayDatetime/DisplayDatetime'
import RenderBody from 'src/components/RenderBody/RenderBody'
import Video from 'src/components/Video/Video'
import { EPostDisplayType } from 'src/types/post-display-type.enum'

interface Props {
  article: Post
  displayType: EPostDisplayType
  date?: string
}

const ArticleVideo = ({ article, displayType, date }: Props) => {
  const authorName =
    article.user?.profile?.name || article.user?.name || 'Anonymous'

  if (!article?.videoPost?.videoUrl) return null

  return (
    <>
      {displayType === EPostDisplayType.PREVIEW && (
        <>
          <header className="mb-3">
            <div className="mt-4 flex flex-row items-center gap-2 pl-1">
              <ArticleTypeIcon type={EPostType.VIDEO} />
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

          <Video embedUrl={article?.videoPost?.videoUrl} />

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
          <header className="flex flex-col gap-1">
            <h1 className="flex items-center gap-2 text-3xl font-extrabold uppercase tracking-tight md:gap-4">
              <ArticleTypeIcon type={article.type as EPostType} />
              {article.title}
            </h1>

            <div className="flex flex-row items-center gap-2">
              <span className="text-sm text-slate-500">{authorName}</span>
              <DisplayDatetime
                datetime={article.createdAt}
                hideDate={false}
                className="text-sm text-slate-500"
              />
            </div>
          </header>
          <Video embedUrl={article?.videoPost?.videoUrl} />
          <RenderBody body={article.body} />
        </>
      )}
    </>
  )
}

export default ArticleVideo
