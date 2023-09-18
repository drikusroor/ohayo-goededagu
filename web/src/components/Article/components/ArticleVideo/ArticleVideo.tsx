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
import LocationPin from 'src/components/LocationPin/LocationPin'
import RenderBody from 'src/components/RenderBody/RenderBody'
import Video from 'src/components/Video/Video'
import { EPostDisplayType } from 'src/types/post-display-type.enum'

import PreviewLayout from '../PreviewLayout/PreviewLayout'

interface Props {
  article: Post
  displayType: EPostDisplayType
  date?: string
}

const ArticleVideo = ({ article, displayType }: Props) => {
  const authorName =
    article.user?.profile?.name || article.user?.name || 'Anonymous'

  if (!article?.videoPost?.videoUrl) return null

  return (
    <>
      {displayType === EPostDisplayType.PREVIEW && (
        <PreviewLayout article={article} authorName={authorName} />
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
                showDate={true}
                className="text-sm text-slate-500"
              />
              <LocationPin location={article.location} className="text-white" />
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
