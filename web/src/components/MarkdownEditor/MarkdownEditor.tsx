import { useState } from 'react'

import {
  BsBoxArrowUpRight,
  BsEyeglasses,
  BsLayoutSplit,
  BsPencil,
  BsQuestionCircle,
} from 'react-icons/bs'
import ReactMarkdown from 'react-markdown'

import { TextAreaField } from '@redwoodjs/forms'
import { Link } from '@redwoodjs/router'

import { classNames } from 'src/lib/class-names'

interface IMarkdownEditorProps {
  name: string
  placeholder?: string
  value?: string
  onChange: (body: string) => void
  validation?: { required?: boolean }
  className?: string
  disabled?: boolean
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void
}

type PreviewState = 'PREVIEW' | 'EDIT' | 'SPLIT'

const MarkdownEditor = ({
  name,
  placeholder,
  onChange,
  value,
  validation,
  className = '',
  disabled = false,
  onKeyDown,
}: IMarkdownEditorProps) => {
  const [previewState, setPreviewState] = useState<PreviewState>('EDIT')

  return (
    <div>
      <div className="mt-2 flex flex-row rounded-md">
        <button
          className={classNames(
            'w-30 flex flex-row items-center gap-2 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700',
            previewState === 'EDIT' ? 'bg-blue-700' : ''
          )}
          onClick={() => {
            setPreviewState('EDIT')
          }}
        >
          <BsPencil />
          Edit
        </button>

        <button
          className={classNames(
            'w-30 flex flex-row items-center gap-2 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700',
            previewState === 'SPLIT' ? 'bg-blue-700' : ''
          )}
          onClick={() => {
            setPreviewState('SPLIT')
          }}
        >
          <BsLayoutSplit />
          Split
        </button>
        <button
          className={classNames(
            'w-30 flex flex-row items-center gap-2 bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700',
            previewState === 'PREVIEW' ? 'bg-blue-700' : ''
          )}
          onClick={() => {
            setPreviewState('PREVIEW')
          }}
        >
          <BsEyeglasses />
          Preview
        </button>
        <a
          href="https://www.markdownguide.org/basic-syntax/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-30 ml-auto flex flex-row items-center gap-2 px-4 py-2 font-bold text-blue-700 hover:text-blue-900 hover:underline"
        >
          <BsQuestionCircle />
          Markdown cheatsheet
          <BsBoxArrowUpRight />
        </a>
      </div>
      <div className="mt-2 flex flex-col gap-3 md:flex-row">
        <div
          className={classNames(
            previewState === 'SPLIT' ? 'md:w-1/2' : 'w-full',
            previewState === 'PREVIEW' ? 'hidden w-0' : ''
          )}
        >
          <TextAreaField
            name={name}
            placeholder={placeholder}
            value={value}
            className={`rw-input h-96 ${className} mt-0`}
            errorClassName="rw-input rw-input-error"
            onChange={(e) => {
              onChange(e.target.value)
            }}
            validation={validation}
            disabled={disabled}
            onKeyDown={onKeyDown}
          />
        </div>
        {previewState !== 'EDIT' && (
          <div
            className={classNames(
              previewState === 'SPLIT' ? 'md:w-1/2' : 'w-full'
            )}
          >
            <ReactMarkdown className="prose w-full bg-white p-2">
              {value || 'Nothing to preview'}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarkdownEditor
