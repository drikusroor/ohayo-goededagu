import {
  BsArrowRightCircle,
  BsFillCheckCircleFill,
  BsFillCircleFill,
  BsJournalRichtext,
  BsViewList,
} from 'react-icons/bs'
import { Post } from 'types/graphql'

import ArticlePhotoGallery from 'src/components/Article/components/ArticlePhotoGallery'
import ArticleTypeIcon, {
  EPostType,
} from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import Avatar from 'src/components/Avatar/Avatar'
import { classNames } from 'src/lib/class-names'
import { EPostDisplayType } from 'src/types/post-display-type.enum'

import Button from '../../Button/Button'

interface Props {
  post: Post
}

const Preview = ({ post }: Props) => {
  const {
    title = 'Title',
    body,
    type,
    coverImage,
    user: { profile },
  } = post

  const [blogRollPreview, setBlogRollPreview] = React.useState<boolean>(false)

  return (
    <div className="drop-shadow">
      <div className="mt-8 flex flex-row gap-0">
        <Button
          type="button"
          onClick={() => {
            setBlogRollPreview(false)
          }}
          className={classNames(
            'flex items-center gap-2 rounded-b-none rounded-r-none !text-gray-700 hover:bg-gray-200',
            !blogRollPreview ? 'bg-gray-200' : 'bg-gray-300 shadow-inner'
          )}
          title="Preview Full Article"
          aria-label="Preview Full Article"
        >
          <BsJournalRichtext />
          Preview Full Article
          {!blogRollPreview ? <BsFillCheckCircleFill /> : <BsFillCircleFill />}
        </Button>
        <Button
          type="button"
          onClick={() => {
            setBlogRollPreview(true)
          }}
          className={classNames(
            'flex items-center gap-2 rounded-b-none rounded-l-none !text-gray-700 hover:bg-gray-200',
            blogRollPreview ? 'bg-gray-200' : 'bg-gray-300 shadow-inner'
          )}
          title="Preview Blog Roll"
          aria-label="Preview Blog Roll"
        >
          <BsViewList />
          Preview Blog Roll
          {blogRollPreview ? <BsFillCheckCircleFill /> : <BsFillCircleFill />}
        </Button>
      </div>

      {type === EPostType.PHOTO_GALLERY && (
        <div>
          <ArticlePhotoGallery
            article={post}
            displayType={
              blogRollPreview ? EPostDisplayType.PREVIEW : EPostDisplayType.FULL
            }
          />
        </div>
      )}

      {!blogRollPreview && (
        <div className="mt-2 grid max-w-6xl">
          <section
            style={{
              backgroundImage: coverImage
                ? `url(${coverImage})`
                : `url(/images/logo-full.png)`,
            }}
            className="rounded bg-gray-400 bg-cover bg-center bg-no-repeat bg-blend-multiply"
          >
            <div className="mx-auto flex aspect-video max-w-screen-xl flex-col justify-end px-4">
              <div className="flex flex-row items-center justify-start gap-2">
                <div>
                  <ArticleTypeIcon type={type as EPostType} />
                </div>
                <h1 className="flex items-center gap-2 text-3xl font-extrabold uppercase leading-none tracking-tight text-white drop-shadow-xl md:gap-4 md:text-5xl lg:text-6xl">
                  {title}
                </h1>
              </div>
              <div className="flex flex-row items-center gap-2 pb-2">
                <span className="text-sm text-slate-200">
                  {profile?.name ? profile?.name : 'Your name'}
                </span>
                <span className="text-sm text-slate-200">
                  | {post?.createdAt}
                </span>
              </div>
            </div>
          </section>
        </div>
      )}

      {blogRollPreview && (
        <div className="mt-2 grid max-w-6xl">
          <section
            style={{
              backgroundImage: coverImage
                ? `url(${coverImage})`
                : `url(/images/logo-full.png)`,
            }}
            className="rounded bg-gray-600 bg-cover bg-center bg-no-repeat bg-blend-multiply"
          >
            <div className="mx-auto max-w-screen-xl px-4 py-20 md:py-24 lg:py-56">
              <div className="flex flex-row items-center justify-center gap-2 pb-2">
                <div>
                  <ArticleTypeIcon type={type as EPostType} />
                </div>

                <h1 className="flex flex-wrap items-center justify-center text-3xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
                  {title}
                </h1>
              </div>
              <p className="mb-8 line-clamp-3 text-center text-lg font-normal text-gray-300 sm:px-16 lg:px-48 lg:text-xl">
                {body}
              </p>
              <div className="flex flex-row items-center justify-center gap-12">
                <div className="flex flex-row items-center gap-2">
                  <Avatar
                    src={profile?.avatar}
                    alt={profile?.name}
                    name={profile?.name}
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-sm text-slate-300">
                      {profile?.name ? profile?.name : 'Your name'}
                    </span>
                    <span className="text-sm text-slate-300">
                      {post?.createdAt}
                    </span>
                  </div>
                </div>
                <span className="items-center justify-end text-center text-base font-medium text-white focus:ring-4 focus:ring-gray-400">
                  <Button className="flex max-w-fit items-center justify-end gap-2 px-4 py-3 text-xs">
                    <span className="hidden sm:inline-block">Lees verder</span>
                    <BsArrowRightCircle />
                  </Button>
                </span>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default Preview
