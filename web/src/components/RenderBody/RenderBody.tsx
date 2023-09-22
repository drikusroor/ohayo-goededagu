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
        'prose prose-sm max-w-full md:prose-base lg:prose-lg ',
        className
      )}
    >
      {body}
    </ReactMarkdown>
  )
}

export default RenderBody
