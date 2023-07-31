import { useMemo } from 'react'

import { BsPencil } from 'react-icons/bs'
import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'
import { EPostDisplayType } from 'src/types/post-display-type.enum'

import { EPostType } from '../ArticleTypeIcon/ArticleTypeIcon'
import Button from '../Button/Button'
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
  const { currentUser } = useAuth()
  const isUserAuthor = article.user.id === currentUser?.id

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
            displayType={EPostDisplayType.FULL}
            date={formattedDate}
          />
        )}

        {article.type === EPostType.VIDEO && (
          <ArticleVideo
            article={article}
            displayType={EPostDisplayType.FULL}
            date={formattedDate}
          />
        )}

        {article.type === EPostType.CHOTTO && (
          <ArticleChotto
            article={article}
            displayType={EPostDisplayType.FULL}
            date={formattedDate}
          />
        )}

        {article.type === EPostType.HAIKU && (
          <ArticleHaiku
            article={article}
            displayType={EPostDisplayType.FULL}
            date={formattedDate}
          />
        )}
      </div>

      {isUserAuthor && (
        <div className="flex flex-row items-center justify-between pt-4">
          <div className="flex items-center gap-6">
            <Link to={routes.editPost({ id: article.id })}>
              <Button className="flex items-center gap-2">
                <BsPencil />
                Edit
              </Button>
            </Link>
            (Only visible to you)
          </div>
        </div>
      )}

      <div>
        <h2 className="mt-5 text-2xl font-light text-gray-600">Comments</h2>
        <ul className="mt-3 max-w-xl">
          {sortedComments.length > 0 ? (
            sortedComments.map((comment) => (
              <li key={comment.id} className="mb-4">
                <Comment comment={comment} />
              </li>
            ))
          ) : (
            <div className="flex flex-col gap-2 rounded-md bg-gray-100 p-3">
              <p className=" text-gray-500">No comments yet. 🙃</p>
              <p className=" text-gray-500">Be the first! 😻</p>
            </div>
          )}
        </ul>
        <div className="mt-5">
          <CommentForm postId={article.id} />
        </div>
      </div>
    </article>
  )
}

export default Article
