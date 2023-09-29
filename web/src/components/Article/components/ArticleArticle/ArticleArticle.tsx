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
              <span className="group relative flex items-center gap-2 text-lg ">
                🇳🇱
                <span className="user-select-none absolute bottom-full right-0 mb-2 w-44 rounded-md border-2 border-slate-200 bg-white p-2 text-left text-xs text-slate-500 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                  Beschikbaar in Nederlands
                </span>
              </span>
            )}
            {article.titleEn && article.bodyEn && (
              <span className="group relative flex items-center gap-2 text-lg ">
                🇬🇧
                <span className="user-select-none absolute bottom-full right-0 mb-2 w-32 rounded-md border-2 border-slate-200 bg-white p-2 text-left text-xs text-slate-500 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                  Available in English
                </span>
              </span>
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
