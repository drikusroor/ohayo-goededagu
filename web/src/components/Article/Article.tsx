import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

interface Props {
  article: Post
}

const Article = ({ article }: Props) => {
  return (
    <article className="mb-4 rounded border-2 border-black p-2">
      <header className="mb-3">
        <h2 className="text-2xl">
          <Link to={routes.article({ id: article.id })}>{article.title}</Link>
        </h2>
        <div className="flex gap-2">
          <sub className="text-sm text-slate-500">
            Posted at: {new Date(article.createdAt).toLocaleString()}
          </sub>
          <span className="text-sm text-gray-400">
            {article.user.name
              ? `by ${article.user.name}`
              : article.user.email
              ? article.user.email
              : 'by Anonymous'}
          </span>
        </div>
      </header>
      <div>{article.body}</div>
    </article>
  )
}

export default Article
