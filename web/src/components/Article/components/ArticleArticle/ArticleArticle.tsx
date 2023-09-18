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
import FullLayout from '../FullLayout/FullLayout'
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
            <PreviewLayout article={article} />
          </div>
        </section>
      )}

      {displayType === EPostDisplayType.FULL && (
        <FullLayout article={article} />
      )}
    </>
  )
}

export default ArticleArticle
