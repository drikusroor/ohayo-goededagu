import ReactMarkdown from 'react-markdown'

interface IRenderBodyProps {
  body: string
}

const RenderBody = ({ body }: IRenderBodyProps) => {
  return (
    <ReactMarkdown className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
      {body}
    </ReactMarkdown>
  )
}

export default RenderBody
