import { useRef, useState } from 'react'

import { BsSend, BsXCircle } from 'react-icons/bs'
import { Comment } from 'types/graphql'

import { Form, FormError, SubmitHandler } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { QUERY as FindArticleQuery } from 'src/components/ArticleCell'
import MarkdownEditor from 'src/components/MarkdownEditor/MarkdownEditor'
import { classNames } from 'src/lib/class-names'

import Button from '../Button/Button'

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

const UPDATE_COMMENT = gql`
  mutation UserUpdateCommentMutation($id: Int!, $input: UpdateCommentInput!) {
    updateComment(id: $id, input: $input) {
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
  afterSubmit?: () => void
  comment?: Comment
}

const CommentForm = ({
  afterSubmit,
  postId,
  replyToComment,
  onCancel,
  comment,
}: Props) => {
  const { currentUser } = useAuth()

  const formRef = useRef<HTMLFormElement>(null)

  const allowedRoles = ['ADMIN', 'MODERATOR', 'USER']
  const isAllowedToComment =
    currentUser?.id &&
    currentUser?.roles.some((role) => allowedRoles.includes(role))

  const [body, setBody] = useState(comment?.body || '')
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      toast.success('Thank you for your comment!')
      setBody('')
      if (afterSubmit) {
        return afterSubmit()
      }
      onCancel?.()
    },
    refetchQueries: [
      { query: FindArticleQuery, variables: { id: postId, $id: postId } },
    ],
  })

  const [updateComment] = useMutation(UPDATE_COMMENT, {
    onCompleted: () => {
      toast.success('Thank you for your comment!')
      setBody('')
      if (afterSubmit) {
        return afterSubmit()
      }
      onCancel?.()
    },
    refetchQueries: [
      { query: FindArticleQuery, variables: { id: postId, $id: postId } },
    ],
  })

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    // if editing a comment, update it
    if (comment) {
      updateComment({
        variables: { id: comment.id, input: { body } },
      })
      return
    }

    // if not editing a comment, create a new one
    // if replying to a comment, set parentId
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
        <div className="button-group justify-start">
          <Button
            type="submit"
            color="cobalt-blue"
            size="sm"
            textStay
            icon={<BsSend />}
            text={
              loading ? 'Saving...' : replyToComment ? 'Submit reply' : 'Submit'
            }
            disabled={loading}
          />
          {replyToComment && (
            <Button
              text="Cancel"
              textStay
              icon={<BsXCircle />}
              color="monza-red"
              size="sm"
              onClick={onCancel}
            />
          )}
        </div>
      </Form>
    </div>
  )
}

export default CommentForm
