import { useState } from 'react'

import {
  Form,
  FormError,
  Label,
  TextAreaField,
  Submit,
  SubmitHandler,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
import { QUERY as FindArticleQuery } from 'src/components/ArticleCell'

const CREATE_COMMENT = gql`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
    createComment(input: $input) {
      id
      body
      createdAt
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
}

const CommentForm = ({ postId }: Props) => {
  const { currentUser } = useAuth()

  const allowedRoles = ['ADMIN', 'MODERATOR', 'USER']
  const isAllowedToComment =
    currentUser?.id &&
    currentUser?.roles.some((role) => allowedRoles.includes(role))

  const [body, setBody] = useState('')
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT, {
    onCompleted: () => {
      toast.success('Thank you for your comment!')
      setBody('')
    },
    refetchQueries: [
      { query: FindArticleQuery, variables: { id: postId, $id: postId } },
    ],
  })

  const onSubmit: SubmitHandler<FormValues> = (input) => {
    createComment({ variables: { input: { postId, ...input } } })
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
    <div className="max-w-xl">
      <h3 className="text-lg font-light text-gray-600">Leave a Comment</h3>
      <Form className="mt-4 w-full" onSubmit={onSubmit}>
        <FormError
          error={error}
          titleClassName="font-semibold"
          wrapperClassName="bg-red-100 text-red-900 text-sm p-3 rounded"
        />

        <span className="block text-xs uppercase text-gray-500">
          Logged in as &nbsp;
          <span className="font-bold">
            {currentUser.name ? currentUser.name : currentUser.email}
          </span>
        </span>

        <Label
          name="body"
          className="mb-1 mt-2 block text-xs font-semibold uppercase text-gray-500"
        >
          Comment
        </Label>
        <TextAreaField
          name="body"
          disabled={loading}
          className="block h-24 w-full rounded border p-1 text-sm"
          validation={{ required: true }}
          placeholder="Type your comment here..."
          onChange={(e) => setBody(e.target.value)}
          value={body}
        />

        <Submit
          disabled={loading}
          title={loading ? 'Saving...' : 'Submit'}
          className="mt-4 block rounded bg-blue-500 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white disabled:opacity-50"
        >
          Submit
        </Submit>
      </Form>
    </div>
  )
}

export default CommentForm
