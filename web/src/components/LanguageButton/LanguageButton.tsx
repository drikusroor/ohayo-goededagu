import { Post } from 'types/graphql'

import Button from '../Button/Button'

interface Props {
  setEnglish?: () => void
  article?: Post
  readOnly?: boolean
}

const LanguageButton = ({ article, readOnly, setEnglish }: Props) => {
  return (
    <>
      {readOnly && (
        <div className="flex flex-row content-start justify-end gap-2 p-2">
          {article.title && article.body && (
            <span className="group relative flex items-center gap-2 text-lg ">
              🇳🇱
              <span className="user-select-none absolute bottom-full right-0 mb-2 w-52 rounded-md border-2 border-slate-200 bg-white p-2 text-left text-xs text-slate-500 opacity-0 shadow-md transition-opacity group-hover:opacity-100">
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
      )}
      {!readOnly && (
        <div className="flex flex-row gap-2">
          <Button
            variant="outlined"
            className="hover:bg-slate-200"
            onClick={() => {
              setEnglish(false)
            }}
          >
            <span className="text-xl">🇳🇱</span>
          </Button>
          <Button
            variant="outlined"
            className="hover:bg-slate-200"
            onClick={() => {
              setEnglish(true)
            }}
          >
            <span className="text-xl">🇬🇧</span>
          </Button>
        </div>
      )}
    </>
  )
}

export default LanguageButton
