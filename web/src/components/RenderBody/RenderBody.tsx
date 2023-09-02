import React, { lazy, Suspense } from 'react'

const ReactMarkdown = lazy(() => import('react-markdown'))

interface IRenderBodyProps {
  body: string
}

const RenderBody = ({ body }: IRenderBodyProps) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReactMarkdown className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        {body}
      </ReactMarkdown>
    </Suspense>
  )
}

export default RenderBody
