import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import ArticleCommentCountBadge from 'src/components/ArticleCommentCountBadge/ArticleCommentCountBadge'
import AvatarTimestamp from 'src/components/Avatar/AvatarTimestamp/AvatarTimestamp'
import { EPostDisplayType } from 'src/types/post-display-type.enum'

import ArticleTypeIcon, {
  EPostType,
} from '../../ArticleTypeIcon/ArticleTypeIcon'

interface Props {
  article: Post
  displayType: EPostDisplayType
  date?: string
}

const ArticleChotto = ({ article, displayType, date }: Props) => {
  return (
    <>
      {displayType === EPostDisplayType.PREVIEW && (
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
              <div className="justmt-2 line-clamp-5">{article.body}</div>
              <div className="pt-4">
                <AvatarTimestamp article={article} />
                {article.comments.length > 0 && (
                  <ArticleCommentCountBadge count={article.comments.length} />
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {displayType === EPostDisplayType.FULL && (
        <>
          <header className="flex flex-col gap-1">
            <h1 className="flex items-center gap-2 text-3xl font-extrabold uppercase leading-none tracking-tight md:gap-4">
              <ArticleTypeIcon type={article.type as EPostType} />
              {article.title}
            </h1>

            <div className="flex flex-row items-center gap-2">
              <span className="text-sm text-slate-500">
                {article.user.profile.name
                  ? article.user.profile.name
                  : article.user.name
                  ? article.user.name
                  : article.user.email
                  ? article.user.email
                  : 'Anonymous'}
              </span>
              <span className="text-sm text-slate-500"> | {date}</span>
            </div>
          </header>
          <div>{article.body}</div>
        </>
      )}
    </>
  )
}

export default ArticleChotto
