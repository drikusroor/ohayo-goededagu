import UserFilterCell from 'src/components/UserFilterCell'

import { EPostType } from '../ArticleTypeIcon/ArticleTypeIcon'
import PostTypeFilter from '../PostTypeFilter/PostTypeFilter'
interface PostFilterMenuProps {
  activeFilters: {
    postTypes: EPostType[]
    authors: string[]
    from: string
    to: string
  }
  showPostTypeFilter?: boolean
}

const PostFilterMenu = ({
  activeFilters,
  showPostTypeFilter = true,
}: PostFilterMenuProps) => {
  const { postTypes = [], authors = [] } = activeFilters

  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      {showPostTypeFilter && <PostTypeFilter activePostTypes={postTypes} />}
      <UserFilterCell activeAuthors={authors} />
    </div>
  )
}

export default PostFilterMenu
