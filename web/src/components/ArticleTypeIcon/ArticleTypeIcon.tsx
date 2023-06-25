import {
  BsJournalRichtext,
  BsFilm,
  BsSticky,
  BsImages,
  BsBrush,
  BsQuestion,
} from 'react-icons/bs'

export enum EPostType {
  ARTICLE = 'ARTICLE',
  VIDEO = 'VIDEO',
  HAIKU = 'HAIKU',
  CHOTTO = 'CHOTTO',
  PHOTO_GALLERY = 'PHOTO_GALLERY',
}

interface IArticleTypeIconProps {
  type: EPostType
}

export const getIcon = (type: EPostType) => {
  switch (type) {
    case EPostType.ARTICLE:
      return <BsJournalRichtext />
    case EPostType.VIDEO:
      return <BsFilm />
    case EPostType.HAIKU:
      return <BsBrush />
    case EPostType.PHOTO_GALLERY:
      return <BsImages />
    case EPostType.CHOTTO:
      return <BsSticky />
    default:
      return <BsQuestion />
  }
}

const ArticleTypeIcon = ({ type }: IArticleTypeIconProps) => {
  return (
    <div className="bg-cobalt-red relative flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-slate-500">
      <img
        src="/images/avatar.png"
        alt={type}
        className="bg-cobalt-red absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full object-cover shadow"
        width={10}
        height={10}
      />
      <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-black opacity-20 "></div>

      <div className="absolute text-white"> {getIcon(type)}</div>
    </div>
  )
}

export default ArticleTypeIcon
