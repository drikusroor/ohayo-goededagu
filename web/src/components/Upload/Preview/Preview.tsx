import { BsFillCheckCircleFill, BsFillCircleFill } from 'react-icons/bs'

import { Label } from '@redwoodjs/forms'

import Article from 'src/components/Article/Article'
import ArticlePreview from 'src/components/Article/components/ArticlePreview'
import { classNames } from 'src/lib/class-names'

import { EPostType } from '../../ArticleTypeIcon/ArticleTypeIcon'
import Button from '../../Button/Button'

interface Props {
  profile: object
  post: object
  postType: EPostType
  postTitle: string
  postBody: string
  coverImage?: string
  videoPost: object
}

const Preview = ({
  profile,
  post,
  coverImage,
  postType,
  postTitle,
  postBody,
  videoPost,
}: Props) => {
  const [blogRollPreview, setBlogRollPreview] = React.useState<boolean>(false)

  const formattedCurrentDate = new Date().toLocaleString('nl-NL', {
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
    videoPost: videoPost,
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

      <div className="my-2 rounded bg-gray-300">
        {!blogRollPreview && <Article article={article} />}
        {blogRollPreview && <ArticlePreview article={article} />}
      </div>
    </>
  )
}

export default Preview
