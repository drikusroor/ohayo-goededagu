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
}

const PostFilterMenu = ({ activeFilters }: PostFilterMenuProps) => {
  const { postTypes = [], authors = [] } = activeFilters

  return (
    <div className="flex flex-row gap-4">
      <PostTypeFilter activePostTypes={postTypes} />
      <UserFilterCell activeAuthors={authors} />
    </div>
  )
}

export default PostFilterMenu
