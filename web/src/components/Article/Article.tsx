import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import CommentForm from '../CommentForm/CommentForm'

interface Props {
  article: Post
}

const Article = ({ article }: Props) => {
  const formattedDate = new Date(article.createdAt).toLocaleString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  return (
    <article className="mb-4 p-2">
      <header className="mb-3">
        <h2 className="text-2xl">
          <Link to={routes.article({ id: article.id })}>{article.title}</Link>
        </h2>
        <div className="flex flex-row items-end gap-2">
          <span className="text-sm text-slate-500">
            {article.user.name
              ? article.user.name
              : article.user.email
              ? article.user.email
              : 'Anonymous'}
          </span>
          <span className="text-sm text-slate-500"> | {formattedDate}</span>
        </div>
      </header>
      <div>{article.body}</div>
      <h3 className="mt-4 text-lg font-light text-gray-600">Comments</h3>
      <ul className="mt-4">
        {article.comments.map((comment) => (
          <li key={comment.id} className="mb-4">
            <div className="flex flex-row items-end gap-2">
              <span className="text-sm text-slate-500">
                {comment.user.name
                  ? comment.user.name
                  : comment.user.email
                  ? comment.user.email
                  : 'Anonymous'}
              </span>
              <span className="text-sm text-slate-500">
                | {new Date(comment.createdAt).toLocaleString('nl-NL')}
              </span>
            </div>
            <div className="mt-2">{comment.body}</div>
          </li>
        ))}
      </ul>
      <div className="mt-2">
        <CommentForm postId={article.id} />
      </div>
    </article>
  )
}

export default Article
