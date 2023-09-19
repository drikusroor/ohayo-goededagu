import { Post } from 'types/graphql'

import PhotoGrid from 'src/components/PhotoGrid/PhotoGrid'
import { EPostDisplayType } from 'src/types/post-display-type.enum'

import FullLayout from '../FullLayout/FullLayout'
import PreviewLayout from '../PreviewLayout/PreviewLayout'

interface Props {
  article: Post
  displayType: EPostDisplayType
}

const ArticlePhotoGallery = ({ article, displayType }: Props) => {
  const { imageGalleries = [] } = article

  const galleries = imageGalleries.reduce((acc, galleryOnPost) => {
    const { imageGallery } = galleryOnPost
    if (imageGallery) {
      return [...acc, imageGallery]
    }
    return acc
  }, [])

  if (!article) {
    throw new Error('Could not load article')
  }

  return (
    <>
      {displayType === EPostDisplayType.PREVIEW && (
        <>
          <div className="relative">
            {galleries[0] && (
              <PhotoGrid
                key={galleries[0]}
                images={galleries[0].images}
                preview={true}
                className="block h-full w-full"
              />
            )}
            <div className="font-3xl lg:min-h-48 min-h-20 md:min-h-24 absolute bottom-0 mx-auto flex h-full w-full flex-col justify-center rounded-md bg-gray-600 bg-opacity-50 px-4 text-center text-white text-opacity-100">
              <PreviewLayout article={article} />
            </div>
          </div>
        </>
      )}
      {displayType === EPostDisplayType.FULL && (
        <FullLayout article={article} />
      )}
    </>
  )
}

export default ArticlePhotoGallery
