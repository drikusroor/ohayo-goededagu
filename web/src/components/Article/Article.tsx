import type { Post } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'

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
  console.log('article', article)

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
      video: {article.video} <br />
      {article.video ? (
        <iframe
          width="560"
          height="315"
          src={article.video}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        <span>no video</span>
        // <></>
      )}
    </article>
  )
}

export default Article
