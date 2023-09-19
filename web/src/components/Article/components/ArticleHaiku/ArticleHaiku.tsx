import type { Post } from 'types/graphql'

import { EPostDisplayType } from 'src/types/post-display-type.enum'

import FullLayout from '../FullLayout/FullLayout'
import PreviewLayout from '../PreviewLayout/PreviewLayout'

interface Props {
  article: Post
  displayType: EPostDisplayType
}

const ArticleHaiku = ({ article, displayType }: Props) => {
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

export default ArticleHaiku
