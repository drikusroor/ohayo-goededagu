import { Link, routes, useParams } from '@redwoodjs/router'

import { classNames } from 'src/lib/class-names'

import ArticleTypeIcon, { EPostType } from '../ArticleTypeIcon/ArticleTypeIcon'

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

const getParams = (activePostTypes: EPostType[], postType: EPostType) => {
  if (activePostTypes.includes(postType)) {
    return activePostTypes.filter((type) => type !== postType)
  }

  return [...activePostTypes, postType]
}

const PostTypeFilter = ({ activePostTypes, routeName = 'home' }: Props) => {
  const currentParams = useParams()

  return (
    <ul className="flex gap-2">
      {postTypes.map((type) => (
        <Link
          key={type}
          to={routes[routeName]({
            ...currentParams,
            postTypes: getParams(activePostTypes, type),
          })}
        >
          <div
            className={classNames(
              'rounded-full border-4 border-double',
              activePostTypes.includes(type)
                ? 'border-green-700'
                : 'border-white'
            )}
          >
            <ArticleTypeIcon type={type} />
          </div>
        </Link>
      ))}
    </ul>
  )
}

export default PostTypeFilter
