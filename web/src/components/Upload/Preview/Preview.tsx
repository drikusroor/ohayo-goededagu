import {
  BsFillCheckCircleFill,
  BsFillCircleFill,
  BsJournalRichtext,
  BsViewList,
} from 'react-icons/bs'
import { Post } from 'types/graphql'

import Article from 'src/components/Article/Article'
import ArticlePreview from 'src/components/Article/components/ArticlePreview/ArticlePreview'
import { classNames } from 'src/lib/class-names'

import Button from '../../Button/Button'

interface Props {
  post: Post
  hideComments?: boolean
}

const Preview = ({ post, hideComments }: Props) => {
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
            'flex items-center gap-2 rounded-b-none rounded-r-none text-xl !text-gray-700 hover:bg-gray-100 sm:text-sm',
            !blogRollPreview ? 'bg-gray-100' : 'bg-gray-200 shadow-inner'
          )}
          title="Preview Full Article"
          aria-label="Preview Full Article"
        >
          <BsJournalRichtext />
          <span className="hidden sm:inline-block"> Preview Full Article</span>
          {!blogRollPreview ? <BsFillCheckCircleFill /> : <BsFillCircleFill />}
        </Button>
        <Button
          type="button"
          onClick={() => {
            setBlogRollPreview(true)
          }}
          className={classNames(
            'flex items-center gap-2 rounded-b-none rounded-l-none text-xl !text-gray-700 hover:bg-gray-100 sm:text-sm',
            blogRollPreview ? 'bg-gray-100' : 'bg-gray-200 shadow-inner'
          )}
          title="Preview Blog Roll"
          aria-label="Preview Blog Roll"
        >
          <BsViewList />
          <span className="hidden sm:inline-block"> Preview Blog Roll</span>
          {blogRollPreview ? <BsFillCheckCircleFill /> : <BsFillCircleFill />}
        </Button>
      </div>

      <div className="mb-2 bg-gray-100">
        {!blogRollPreview && <Article article={post} hideComments />}
        {blogRollPreview && <ArticlePreview article={post} />}
      </div>
    </div>
  )
}

export default Preview
