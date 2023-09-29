import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  CheckboxField,
  Submit,
} from '@redwoodjs/forms'

import type { EditThumbById, UpdateThumbInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormThumb = NonNullable<EditThumbById['thumb']>

interface ThumbFormProps {
  thumb?: EditThumbById['thumb']
  onSave: (data: UpdateThumbInput, id?: FormThumb['id']) => void
  error: RWGqlError
  loading: boolean
}

const ThumbForm = (props: ThumbFormProps) => {
  const onSubmit = (data: FormThumb) => {
    props.onSave(data, props?.thumb?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormThumb> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.thumb?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="commentId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Comment id
        </Label>

        <NumberField
          name="commentId"
          defaultValue={props.thumb?.commentId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="commentId" className="rw-field-error" />

        <Label
          name="up"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Up
        </Label>

        <CheckboxField
          name="up"
          defaultChecked={props.thumb?.up}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="up" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ThumbForm
