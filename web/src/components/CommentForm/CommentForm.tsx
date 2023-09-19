import { useRef, useState } from 'react'

import { Comment } from 'types/graphql'

import { Form, FormError, Submit, SubmitHandler } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { QUERY as FindArticleQuery } from 'src/components/ArticleCell'
import { classNames } from 'src/lib/class-names'

import Button from '../Button/Button'
import MarkdownEditor from '../MarkdownEditor/MarkdownEditor'

const CREATE_COMMENT = gql`
  mutation UserCreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      body
      createdAt
      parentId
    }
  }
`

interface FormValues {
  name: string
  email: string
  message: string
}

interface Props {
  postId: number
  replyToComment?: Comment
  onCancel?: () => void
}

const CommentForm = ({ postId, replyToComment, onCancel }: Props) => {
  const { currentUser } = useAuth()

  const formRef = useRef<HTMLFormElement>(null)

  const allowedRoles = ['ADMIN', 'MODERATOR', 'USER']
  const isAllowedToComment =
    currentUser?.id &&
    currentUser?.roles.some((role) => allowedRoles.includes(role))

  const [body, setBody] = useState('')
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      toast.success('Thank you for your comment!')
      setBody('')
      onCancel?.()
    },
    refetchQueries: [
      { query: FindArticleQuery, variables: { id: postId, $id: postId } },
    ],
  })

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    const parentId = replyToComment?.id

    createComment({ variables: { input: { postId, ...input, parentId } } })
  }

  // ctrl/cmd + enter to submit
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.key === 'Enter' && e.ctrlKey) || (e.key === 'Enter' && e.metaKey)) {
      e.preventDefault()
      formRef.current?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      )
    }
  }

  if (!isAllowedToComment) {
    return (
      <div className="max-w-xl">
        <h3 className="text-lg font-light text-gray-600">Leave a Comment</h3>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            You don&apos;t have permission to comment. Please contact the site
            admin.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={classNames(
        'max-w-xl',
        replyToComment && '-mt-4 bg-slate-100 p-2 pt-4'
      )}
    >
      <Form className="mt-3 w-full" onSubmit={onSubmit} ref={formRef}>
        <FormError
          error={error}
          titleClassName="font-semibold"
          wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
        />

        <MarkdownEditor
          name="body"
          disabled={loading}
          className={`block w-full rounded-lg border-2 border-solid border-gray-300 px-4 py-2 text-sm placeholder-gray-500
      shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500
      ${loading ? 'cursor-not-allowed bg-gray-100' : 'bg-white'}`}
          validation={{ required: true }}
          placeholder={`Type your comment here...
(Hint: use ctrl/cmd + enter to submit)`}
          onChange={setBody}
          value={body}
          onKeyDown={onKeyDown}
        />
        <div className="flex flex-row gap-2">
          <Submit
            disabled={loading}
            title={loading ? 'Saving...' : 'Submit'}
            className="mt-4 block rounded bg-cobalt-blue-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-50"
          >
            Submit
            {replyToComment && <span> reply</span>}
          </Submit>
          {replyToComment && (
            <Button
              className="mt-4 block rounded bg-monza-red-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-50"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </Form>
    </div>
  )
}

export default CommentForm
