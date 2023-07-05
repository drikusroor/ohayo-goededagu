import { useMemo } from 'react'

import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import ArticleTypeIcon, { EPostType } from '../ArticleTypeIcon/ArticleTypeIcon'
import Avatar from '../Avatar/Avatar'
import Comment from '../Comment/Comment'
import CommentForm from '../CommentForm/CommentForm'

import ArticleVideo from './components/ArticleVideo'
import { hotScore } from './helpers/sort-comments'

interface Props {
  article: Post
}

const Article = ({ article }: Props) => {
  const formattedDate = new Date(article.createdAt).toLocaleString('nl-NL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const sortedComments = useMemo(() => {
    return [...article.comments].sort((a, b) => {
      const aUpVotes = a.thumbs.filter((t) => t.up).length
      const aDownVotes = a.thumbs.filter((t) => !t.up).length

      const bUpVotes = b.thumbs.filter((t) => t.up).length
      const bDownVotes = b.thumbs.filter((t) => !t.up).length

      const scoreA = hotScore(aUpVotes, aDownVotes, new Date(a.createdAt))
      const scoreB = hotScore(bUpVotes, bDownVotes, new Date(b.createdAt))

      if (scoreA > scoreB) return -1
      if (scoreA < scoreB) return 1
      return 0
    })
  }, [article.comments])

  return (
    <article className="mb-4 p-4">
      {article.type === EPostType.ARTICLE && (
        <section className="mb-4 rounded bg-gray-400 bg-[url('https://a.cdn-hotels.com/gdcs/production8/d946/61ea3fbe-d21e-4b09-a90f-9c6ac0f82e99.jpg')] bg-cover bg-center bg-no-repeat bg-blend-multiply">
          <div className="mx-auto flex aspect-video max-w-screen-xl flex-col justify-end px-4">
            <h1 className="flex items-center gap-2 text-3xl font-extrabold uppercase leading-none tracking-tight text-white drop-shadow-xl md:gap-4 md:text-5xl lg:text-6xl">
              <ArticleTypeIcon type={article.type as EPostType} />
              {article.title}
            </h1>
            <div className="mb-2 flex flex-row items-center gap-2">
              <span className="text-sm text-slate-200">
                {article.user.name
                  ? article.user.name
                  : article.user.email
                  ? article.user.email
                  : 'Anonymous'}
              </span>
              <span className="text-sm text-slate-200"> | {formattedDate}</span>
            </div>
          </div>
        </section>
      )}

      {article.type != EPostType.ARTICLE && (
        <header className="pb-4">
          <h1 className="mb-4 flex items-center gap-2 text-3xl font-extrabold uppercase leading-none tracking-tight md:gap-4">
            <ArticleTypeIcon type={article.type as EPostType} />
            {article.title}
          </h1>

          <div className="flex flex-row items-center gap-2">
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
      )}

      {article.type === EPostType.VIDEO && (
        <div className="pb-4">
          <ArticleVideo videoPost={article.videoPost} />
        </div>
      )}

      <div>{article.body}</div>
      <h3 className="mt-4 text-lg font-light text-gray-600">Comments</h3>
      <ul className="mt-4 max-w-xl">
        {sortedComments.map((comment) => (
          <li key={comment.id} className="mb-4">
            <Comment comment={comment} />
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
