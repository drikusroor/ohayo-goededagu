import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import ArticleCommentCountBadge from 'src/components/ArticleCommentCountBadge/ArticleCommentCountBadge'
import AvatarTimestamp from 'src/components/Avatar/AvatarTimestamp/AvatarTimestamp'
import RenderBody from 'src/components/RenderBody/RenderBody'
import Preview from 'src/components/Upload/Preview/Preview'
import { EPostDisplayType } from 'src/types/post-display-type.enum'

import ArticleTypeIcon, {
  EPostType,
} from '../../../ArticleTypeIcon/ArticleTypeIcon'
import PreviewLayout from '../PreviewLayout/PreviewLayout'

interface Props {
  article: Post
  displayType: EPostDisplayType
  date?: string
}

const ArticleHaiku = ({ article, displayType, date }: Props) => {
  const authorName =
    article.user.profile?.name || article.user.name || 'Anonymous'

  return (
    <>
      {displayType === EPostDisplayType.PREVIEW && (
        <PreviewLayout article={article} />
      )}

      {displayType === EPostDisplayType.FULL && (
        <>
          <header className="flex flex-col gap-1">
            <h1 className="flex items-center gap-2 text-3xl font-extrabold uppercase leading-none tracking-tight md:gap-4">
              <ArticleTypeIcon type={article.type as EPostType} />
              {article.title}
            </h1>

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
              </Link>
              <span className="text-sm text-slate-500"> | {date}</span>
            </div>
          </header>
          <RenderBody body={article.body} />
        </>
      )}
    </>
  )
}

export default ArticleHaiku
