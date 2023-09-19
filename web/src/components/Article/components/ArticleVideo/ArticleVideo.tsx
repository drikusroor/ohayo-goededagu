import { Post } from 'types/graphql'

import { EPostDisplayType } from 'src/types/post-display-type.enum'

import FullLayout from '../FullLayout/FullLayout'
import PreviewLayout from '../PreviewLayout/PreviewLayout'

interface Props {
  article: Post
  displayType: EPostDisplayType
}

const ArticleVideo = ({ article, displayType }: Props) => {
  if (!article?.videoPost?.videoUrl) return null

  return (
    <>
      {displayType === EPostDisplayType.PREVIEW && (
        <PreviewLayout article={article} />
      )}

      {displayType === EPostDisplayType.FULL && (
        <FullLayout article={article} />
      )}
    </>
  )
}

export default ArticleVideo
