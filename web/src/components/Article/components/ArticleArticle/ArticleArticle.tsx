import type { Post } from 'types/graphql'

import { EPostDisplayType } from 'src/types/post-display-type.enum'

import FullLayout from '../FullLayout/FullLayout'
import PreviewLayout from '../PreviewLayout/PreviewLayout'

interface Props {
  article: Post
  displayType: EPostDisplayType
}

const ArticleArticle = ({ article, displayType }: Props) => {
  const { coverImage } = article
  console.log('articlearticle', article)

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
          <div className="flex flex-row content-start justify-end gap-2 p-2">
            {article.title && article.body && (
              <span className="text-lg">🇳🇱</span>
            )}
            {article.titleEn && article.bodyEn && (
              <span className="text-lg">🇬🇧</span>
            )}
          </div>
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
