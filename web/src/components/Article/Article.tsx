import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

interface Props {
  article: Post
}

const Article = ({ article }: Props) => {
  return (
    <article>
      <header className="mb-3">
        <h2 className="text-2xl">
          <Link to={routes.article({ id: article.id })}>{article.title}</Link>
        </h2>
        <sub className="text-sm text-slate-500">
          Posted at: {new Date(article.createdAt).toLocaleString()}
        </sub>
      </header>
      <div>{article.body}</div>
    </article>
  )
}

export default Article
