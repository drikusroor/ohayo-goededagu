import { BsFillChatLeftFill } from 'react-icons/bs'

const ArticleCommentCountBadge = ({ count = 0 }) => {
  return (
    <div className="relative flex flex-row items-center justify-center gap-1">
      <BsFillChatLeftFill color="white" size="2rem">
        {count}
      </BsFillChatLeftFill>
      <span className="absolute -mt-2 rounded-full text-xs text-slate-700">
        {count}
      </span>
    </div>
  )
}

export default ArticleCommentCountBadge
