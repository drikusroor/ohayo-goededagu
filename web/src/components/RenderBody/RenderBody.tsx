import React, { lazy, Suspense } from 'react'

import { classNames } from 'src/lib/class-names'

const ReactMarkdown = lazy(() => import('react-markdown'))

interface IRenderBodyProps {
  body: string
  className?: string
}

const RenderBody = ({ className, body }: IRenderBodyProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReactMarkdown
        className={classNames(
          'prose prose-sm sm:prose lg:prose-lg xl:prose-xl',
          className
        )}
      >
        {body}
      </ReactMarkdown>
    </Suspense>
  )
}

export default RenderBody
