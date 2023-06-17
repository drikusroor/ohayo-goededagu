import type { Post } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'

interface Props {
  article: Post
}

const Article = ({ article }: Props) => {
  const onReadMore = (article: 'article') => {
    navigate(routes.article({ id: article.id }))
  }

  return (
    <article
      className="mb-4 rounded border-2 p-2 hover:cursor-pointer hover:border-black"
      onClick={() => onReadMore(article)}
    >
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
