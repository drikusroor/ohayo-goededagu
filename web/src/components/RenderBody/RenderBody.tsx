import React from 'react'

import ReactMarkdown from 'react-markdown'

import { classNames } from 'src/lib/class-names'

interface IRenderBodyProps {
  body: string
  className?: string
}

const RenderBody = ({ className, body }: IRenderBodyProps) => {
  return (
    <ReactMarkdown
      className={classNames(
        'prose prose-sm sm:prose lg:prose-lg xl:prose-xl',
        className
      )}
    >
      {body}
    </ReactMarkdown>
  )
}

export default RenderBody
