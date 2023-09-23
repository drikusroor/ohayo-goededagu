import PostTypeFilter from '../PostTypeFilter/PostTypeFilter'

interface PostFilterMenuProps {
  activeFilters: {
    postTypes: string[]
    authors: string[]
    from: string
    to: string
  }
}

const PostFilterMenu = ({ activeFilters }: PostFilterMenuProps) => {
  const { postTypes = [], authors = [], from, to } = activeFilters

  return (
    <div>
      <PostTypeFilter activePostTypes={postTypes} />
    </div>
  )
}

export default PostFilterMenu
