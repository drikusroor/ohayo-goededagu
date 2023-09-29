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

export const postTypeOptions = [
  { value: EPostType.ARTICLE, label: 'Article' },
  { value: EPostType.VIDEO, label: 'Video' },
  { value: EPostType.HAIKU, label: 'Haiku' },
  { value: EPostType.CHOTTO, label: 'Chotto' },
  { value: EPostType.PHOTO_GALLERY, label: 'Photo Gallery' },
]

interface IArticleTypeIconProps {
  type: EPostType
  showTitle?: boolean
}

export const getIcon = (type: EPostType) => {
  switch (type) {
    case EPostType.ARTICLE:
      return <BsJournalRichtext data-testid="BsJournalRichtext" />
    case EPostType.VIDEO:
      return <BsFilm data-testid="BsFilm" />
    case EPostType.HAIKU:
      return <BsBrush data-testid="BsBrush" />
    case EPostType.PHOTO_GALLERY:
      return <BsImages data-testid="BsImages" />
    case EPostType.CHOTTO:
      return <BsSticky data-testid="BsSticky" />
    default:
      return <BsQuestion data-testid="BsQuestion" />
  }
}

const ArticleTypeIcon = ({ type, showTitle = true }: IArticleTypeIconProps) => {
  const label = postTypeOptions.find((option) => option.value === type)?.label

  return (
    <div
      className="bg-cobalt-red-500 relative flex h-10 w-10 items-center justify-center rounded-full text-lg font-semibold text-slate-500"
      title={showTitle ? `This is a ${label} post` : undefined}
    >
      <img
        src="/images/avatar.png"
        alt={type}
        className="bg-cobalt-red-500 absolute left-0 top-0 flex h-full w-full items-center justify-center rounded-full object-cover shadow"
        width={10}
        height={10}
      />
      <div className="absolute flex h-full w-full items-center justify-center rounded-full bg-black opacity-20 "></div>

      <div className="absolute text-white"> {getIcon(type)}</div>
    </div>
  )
}

export default ArticleTypeIcon
