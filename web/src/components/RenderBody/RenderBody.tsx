import React from 'react'

import ReactMarkdown from 'react-markdown'

import { classNames } from 'src/lib/class-names'

interface IRenderBodyProps {
  body: string
  className?: string
}

const RenderBody = ({ className, body }: IRenderBodyProps) => {
  return <ReactMarkdown className={classNames(className)}>{body}</ReactMarkdown>
}

export default RenderBody
