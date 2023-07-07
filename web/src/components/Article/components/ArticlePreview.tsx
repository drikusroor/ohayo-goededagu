import { BsArrowRightCircle } from 'react-icons/bs'
import type { Post } from 'types/graphql'

import { Link, navigate, routes } from '@redwoodjs/router'

import Button from 'src/components/Button/Button'

import ArticleTypeIcon, {
  EPostType,
} from '../../ArticleTypeIcon/ArticleTypeIcon'
import Avatar from '../../Avatar/Avatar'

import ArticleArticle from './ArticleArticle'
import ArticleChotto from './ArticleChotto'
import ArticleHaiku from './ArticleHaiku'
import ArticleVideo from './ArticleVideo'

interface Props {
  article: Post
}

const ArticlePreview = ({ article }: Props) => {
  const onReadMore = (article: 'article') => {
    navigate(routes.article({ id: article.id }))
  }

  const border =
    article.type === EPostType.HAIKU
      ? `border-y-2 border-x-0 rounded-none`
      : article.type === EPostType.CHOTTO
      ? `border-dashed`
      : `border-solid`

  return (
    <article
      className={`rounded border-2 p-2 hover:cursor-pointer hover:border-black ${border}`}
      onClick={() => onReadMore(article)}
      tabIndex={0}
    >
      {article.type === EPostType.ARTICLE && (
        <ArticleArticle article={article} />
      )}

      {article.type === EPostType.VIDEO && <ArticleVideo article={article} />}

      {article.type === EPostType.CHOTTO && <ArticleChotto article={article} />}

      {article.type === EPostType.HAIKU && <ArticleHaiku article={article} />}
    </article>
  )
}

export default ArticlePreview
