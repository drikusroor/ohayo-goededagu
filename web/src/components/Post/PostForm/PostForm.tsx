import { BsFillSendFill, BsPencilSquare } from 'react-icons/bs'
import type { EditPostById, UpdatePostInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  CheckboxField,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'
import { classNames } from 'src/lib/class-names'

type FormPost = NonNullable<EditPostById['post']>

interface PostFormProps {
  post?: EditPostById['post']
  onSave: (data: UpdatePostInput, id?: FormPost['id']) => void
  error: RWGqlError
  loading: boolean
}

const PostForm = (props: PostFormProps) => {
  const onSubmit = (data: FormPost) => {
    props.onSave({ ...data, published }, props?.post?.id)
  }

  const [published, setPublished] = React.useState<boolean>(
    props.post?.published || false
  )

  return (
    <div className="rw-form-wrapper">
      <Form<FormPost> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>

        <TextField
          name="title"
          defaultValue={props.post?.title}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="body"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Body
        </Label>

        <TextField
          name="body"
          defaultValue={props.post?.body}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="body" className="rw-field-error" />

        <div className="rw-button-group gap-0">
          <Button
            type="button"
            onClick={() => {
              setPublished(false)
            }}
            className={classNames(
              'flex items-center gap-2 rounded-r-none hover:bg-rw-blue-600',
              !published ? 'bg-rw-blue-600 font-bold' : 'bg-rw-blue-500'
            )}
          >
            Draft
            <BsPencilSquare />
          </Button>

          <Button
            type="button"
            onClick={() => {
              setPublished(true)
            }}
            className={classNames(
              'flex items-center gap-2 rounded-l-none hover:bg-rw-blue-600',
              published ? 'bg-rw-blue-600 font-bold' : 'bg-rw-blue-500'
            )}
          >
            Published
            <BsFillSendFill />
          </Button>
        </div>

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default PostForm
