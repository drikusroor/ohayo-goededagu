import { Link, routes, useParams } from '@redwoodjs/router'

import { classNames } from 'src/lib/class-names'

import ArticleTypeIcon, {
  EPostType,
  postTypeOptions,
} from '../ArticleTypeIcon/ArticleTypeIcon'

interface Props {
  activePostTypes: EPostType[]
  routeName?: string
}

const postTypes = [
  EPostType.ARTICLE,
  EPostType.VIDEO,
  EPostType.HAIKU,
  EPostType.CHOTTO,
  EPostType.PHOTO_GALLERY,
]

const getParams = (
  currentParams: Record<string, string>,
  activePostTypes: EPostType[],
  postType: EPostType
) => {
  // if removing the last post type, remove the postTypes param
  if (activePostTypes.length === 1 && activePostTypes.includes(postType)) {
    const { postTypes: _postTypes, ...rest } = currentParams

    return rest
  }

  if (activePostTypes.includes(postType)) {
    return {
      ...currentParams,
      postTypes: activePostTypes.filter((type) => type !== postType),
    }
  }

  return {
    ...currentParams,
    postTypes: [...activePostTypes, postType],
  }
}

const getLabel = (type: EPostType) => {
  return postTypeOptions.find((option) => option.value === type)?.label
}

const PostTypeFilter = ({ activePostTypes, routeName = 'home' }: Props) => {
  const currentParams = useParams()

  return (
    <ul className="flex gap-2">
      {postTypes.map((type) => (
        <Link
          key={type}
          to={routes[routeName](
            getParams(currentParams, activePostTypes, type)
          )}
          title={`Toon ${getLabel(type)} posts`}
        >
          <div
            className={classNames(
              'rounded-full border-4 border-double',
              activePostTypes.includes(type)
                ? 'border-green-700'
                : 'border-white'
            )}
          >
            <ArticleTypeIcon type={type} showTitle={false} />
          </div>
        </Link>
      ))}
    </ul>
  )
}

export default PostTypeFilter
