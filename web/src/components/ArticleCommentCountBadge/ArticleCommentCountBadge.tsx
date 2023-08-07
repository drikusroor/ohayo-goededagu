import { BsChatLeft } from 'react-icons/bs'

import { classNames } from 'src/lib/class-names'

interface IArticleCommentCountBadgeProps {
  count?: number
  variant?: 'light' | 'dark'
}

const ArticleCommentCountBadge = ({
  count = 0,
  variant = 'light',
}: IArticleCommentCountBadgeProps) => {
  return (
    <div className="relative flex flex-row items-center justify-center gap-1">
      <BsChatLeft size="2rem" fill={variant === 'light' ? '#fff' : '#000'}>
        {count}
      </BsChatLeft>
      <span
        className={classNames(
          'absolute -mt-2 rounded-full text-xs',
          variant === 'light' ? 'text-white' : 'text-black'
        )}
      >
        {count}
      </span>
    </div>
  )
}

export default ArticleCommentCountBadge
