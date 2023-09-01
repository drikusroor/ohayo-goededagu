import {
  BsArrowRightCircle,
  BsFillCheckCircleFill,
  BsFillCircleFill,
} from 'react-icons/bs'

import { Label } from '@redwoodjs/forms'

import Article from 'src/components/Article/Article'
import { classNames } from 'src/lib/class-names'

import ArticleTypeIcon, {
  EPostType,
} from '../../ArticleTypeIcon/ArticleTypeIcon'
import Avatar from '../../Avatar/Avatar'
import Button from '../../Button/Button'

interface Props {
  profile: object
  post: object
  postType: EPostType
  postTitle: string
  postBody: string
  coverImage?: string
}

const Preview = ({
  profile,
  post,
  coverImage,
  postType,
  postTitle,
  postBody,
}: Props) => {
  const [blogRollPreview, setBlogRollPreview] = React.useState<boolean>(false)

  const formattedCurrentDate = new Date().toLocaleString('nl-NL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const formattedDate = new Date(post?.createdAt).toLocaleString('nl-NL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const url = {
    url: coverImage,
  }

  const article = {
    id: post?.id ? post?.id : '',
    title: postTitle,
    body: postBody,
    type: postType,
    createdAt: post?.createdAt ? post?.createdAt : formattedCurrentDate,
    coverImage: url,
    user: profile,
  }

  return (
    <>
      <Label
        name="image preview type"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Article preview for:
      </Label>
      <div className="mt-2 flex flex-row gap-0">
        <Button
          type="button"
          onClick={() => {
            setBlogRollPreview(false)
          }}
          className={classNames(
            'flex items-center gap-2 rounded-r-none hover:bg-rw-blue-600',
            !blogRollPreview ? 'bg-green-600 underline' : 'bg-rw-blue-500'
          )}
        >
          Full Article
          {!blogRollPreview ? <BsFillCheckCircleFill /> : <BsFillCircleFill />}
        </Button>
        <Button
          type="button"
          onClick={() => {
            setBlogRollPreview(true)
          }}
          className={classNames(
            'flex items-center gap-2 rounded-l-none hover:bg-rw-blue-600',
            blogRollPreview ? 'bg-green-600 underline' : 'bg-rw-blue-500'
          )}
        >
          Blog Roll
          {blogRollPreview ? <BsFillCheckCircleFill /> : <BsFillCircleFill />}
        </Button>
      </div>

      {!blogRollPreview && (
        <div className="my-2 rounded bg-gray-300">
          <Article article={article} />
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
                  <ArticleTypeIcon type={postType as EPostType} />
                </div>

                <h1 className="flex flex-wrap items-center justify-center text-3xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
                  {postTitle ? postTitle : 'Title'}
                </h1>
              </div>
              <p className="mb-8 line-clamp-3 text-center text-lg font-normal text-gray-300 sm:px-16 lg:px-48 lg:text-xl">
                {postBody}
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
                      {post?.createdAt ? formattedDate : formattedCurrentDate}
                    </span>
                  </div>
                </div>
                <a className="items-center justify-end text-center text-base font-medium text-white focus:ring-4 focus:ring-gray-400">
                  <Button className="flex max-w-fit items-center justify-end gap-2 px-4 py-3 text-xs">
                    <span className="hidden sm:inline-block">Lees verder</span>
                    <BsArrowRightCircle />
                  </Button>
                </a>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export default Preview
