import { TextAreaField } from '@redwoodjs/forms'

interface IMarkdownEditorProps {
  body: string
  onChange: (body: string) => void
  validation?: { required?: boolean }
  className?: string
}

const MarkdownEditor = ({
  body,
  onChange,
  validation,
  className = '',
}: IMarkdownEditorProps) => {
  return (
    <TextAreaField
      name="body"
      defaultValue={body}
      className={`rw-input h-96 ${className}`}
      errorClassName="rw-input rw-input-error"
      onChange={(e) => {
        onChange(e.target.value)
      }}
      validation={validation}
    />
  )
}

export default MarkdownEditor
