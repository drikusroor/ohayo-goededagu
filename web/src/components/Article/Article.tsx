import { useMemo } from 'react'

import type { Post } from 'types/graphql'

import { EPostType } from '../ArticleTypeIcon/ArticleTypeIcon'
import Comment from '../Comment/Comment'
import CommentForm from '../CommentForm/CommentForm'

import ArticleArticle from './components/ArticleArticle'
import ArticleChotto from './components/ArticleChotto'
import ArticleHaiku from './components/ArticleHaiku'
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
    <article className="flex flex-col gap-24 p-3 md:p-10">
      <div className="flex flex-col gap-4">
        {article.type === EPostType.ARTICLE && (
          <ArticleArticle
            article={article}
            type={EPostType.FULL}
            date={formattedDate}
          />
        )}

        {article.type === EPostType.VIDEO && (
          <ArticleVideo
            article={article}
            type={EPostType.FULL}
            date={formattedDate}
          />
        )}

        {article.type === EPostType.CHOTTO && (
          <ArticleChotto
            article={article}
            type={EPostType.FULL}
            date={formattedDate}
          />
        )}

        {article.type === EPostType.HAIKU && (
          <ArticleHaiku
            article={article}
            type={EPostType.FULL}
            date={formattedDate}
          />
        )}
      </div>

      <div>
        <h2 className="mt-5 text-2xl font-light text-gray-600">Comments</h2>
        <ul className="mt-3 max-w-xl">
          {sortedComments.map((comment) => (
            <li key={comment.id} className="mb-4">
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <CommentForm postId={article.id} />
        </div>
      </div>
    </article>
  )
}

export default Article
