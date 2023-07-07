import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import AvatarTimestamp from 'src/components/Avatar/AvatarTimestamp/AvatarTimestamp'

import ArticleTypeIcon, {
  EPostType,
} from '../../ArticleTypeIcon/ArticleTypeIcon'

interface Props {
  article: Post
}

const ArticleChotto = ({ article }: Props) => {
  return (
    <>
      <header className="mb-3">
        <div className="mt-4 flex flex-row items-center gap-2 pl-1">
          <ArticleTypeIcon type={article.type as EPostType} />
          <h2
            className="text-xl font-semibold text-slate-700 md:text-2xl"
            title={article.title}
          >
            <Link to={routes.article({ id: article.id })}>{article.title}</Link>
          </h2>
        </div>
      </header>
      <div className="lg:mx-14">
        <div>
          <div className="justmt-2">{article.body}</div>
          <div className="pt-4">
            <AvatarTimestamp article={article} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticleChotto
