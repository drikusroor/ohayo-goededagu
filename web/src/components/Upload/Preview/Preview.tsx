import {
  BsFillCheckCircleFill,
  BsFillCircleFill,
  BsJournalRichtext,
  BsViewList,
} from 'react-icons/bs'
import { Post, Profile } from 'types/graphql'

import Article from 'src/components/Article/Article'
import ArticlePreview from 'src/components/Article/components/ArticlePreview'
import { classNames } from 'src/lib/class-names'
import dateStringToLocalizedDateString from 'src/lib/localized-date'

import { EPostType } from '../../ArticleTypeIcon/ArticleTypeIcon'
import Button from '../../Button/Button'

interface Props {
  profile: Profile
  post: Post
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

  const url = {
    url: coverImage,
  }

  const article = {
    ...post,
    id: post?.id ? post?.id : '',
    title: postTitle,
    body: postBody,
    type: postType,
    createdAt: post?.createdAt ? post?.createdAt : new Date().toString(),
    updatedAt: post?.createdAt ? post?.createdAt : new Date().toString(),
    coverImage: url,
    videoPost: videoPost,
    comments: [],
    user: {
      ...post?.user,
      profile: profile ? profile : {},
    },
  }

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

      <div className="mb-2 rounded rounded-t-none bg-gray-200">
        {!blogRollPreview && <Article article={article} />}
        {blogRollPreview && <ArticlePreview article={article} />}
      </div>
    </div>
  )
}

export default Preview
