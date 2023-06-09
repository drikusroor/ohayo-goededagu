import {
  BsFillSendFill,
  BsPencilSquare,
  BsFillCircleFill,
  BsFillCheckCircleFill,
  BsFillExclamationTriangleFill,
} from 'react-icons/bs'
import type { EditPostById, UpdatePostInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

import {
  EPostType,
  postTypeOptions,
} from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import Button from 'src/components/Button/Button'
import Upload from 'src/components/Upload/Upload'
import { classNames } from 'src/lib/class-names'

import VideoForm, { IVideoPostFormData } from './TypeForms/VideoForm'

type FormPost = NonNullable<EditPostById['post']>

interface PostFormProps {
  post?: EditPostById['post']
  onSave: (data: UpdatePostInput, id?: FormPost['id']) => void
  error: RWGqlError
  loading: boolean
}

interface IImage {
  id?: string
  imageId: string
  url: string
}

const mapCoverImageDataToImageInput = (image: IImage) => {
  return {
    id: image.id,
    imageId: image.imageId,
    url: image.url,
  }
}

const PostForm = (props: PostFormProps) => {
  const onSubmit = (data: FormPost) => {
    data.published = published
    delete data.coverImage

    if (data.type === EPostType.VIDEO) {
      delete data.videoUrl
      data.videoPost = videoPostFormData
    }

    if (data.type === EPostType.ARTICLE) {
      if (coverImage) {
        data.coverImage = mapCoverImageDataToImageInput(coverImage)
      }
    }

    props.onSave(data, props?.post?.id)
  }

  const [published, setPublished] = React.useState<boolean>(
    props.post?.published || false
  )

  const [postType, setPostType] = React.useState<EPostType>(
    props.post?.type || EPostType.ARTICLE
  )

  const [coverImage, setCoverImage] = React.useState<IImage>(
    props.post?.coverImage
  )

  const [videoPostFormData, setVideoPostFormData] =
    React.useState<IVideoPostFormData>({
      videoUrl: props.post?.videoPost?.videoUrl || '',
    })

  return (
    <>
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
            defaultValue={props.post?.body ?? ''}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: postType !== EPostType.VIDEO }}
          />

          <FieldError name="body" className="rw-field-error" />

          <Label
            name="type"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Post type
          </Label>

          <SelectField
            name="type"
            defaultValue={postType}
            onChange={(e) => {
              setPostType(e.target.value as EPostType)
            }}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          >
            {postTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SelectField>

          {postType === EPostType.VIDEO && (
            <VideoForm
              videoPostFormData={videoPostFormData}
              setVideoPostFormData={setVideoPostFormData}
            />
          )}

          {postType === EPostType.ARTICLE && (
            <Upload
              name="coverImage"
              value={coverImage?.url}
              setValue={({ public_id, secure_url }) =>
                setCoverImage({
                  imageId: public_id,
                  url: secure_url,
                })
              }
            />
          )}

          <div className="rw-button-group gap-0">
            <Button
              type="button"
              onClick={() => {
                setPublished(false)
              }}
              className={classNames(
                'flex items-center gap-2 rounded-r-none hover:bg-rw-blue-600',
                !published ? 'bg-green-600 underline' : 'bg-rw-blue-500'
              )}
            >
              Draft
              <BsPencilSquare />
              {!published ? <BsFillCheckCircleFill /> : <BsFillCircleFill />}
            </Button>

            <Button
              type="button"
              onClick={() => {
                setPublished(true)
              }}
              className={classNames(
                'flex items-center gap-2 rounded-l-none hover:bg-rw-blue-600',
                published ? 'bg-green-600 underline' : 'bg-rw-blue-500'
              )}
            >
              Published
              <BsFillSendFill />
              {published ? <BsFillCheckCircleFill /> : <BsFillCircleFill />}
            </Button>
          </div>

          {published && (
            <div
              className="mt-5 flex items-center border-l-4 border-yellow-500 bg-yellow-100 p-4 text-yellow-700"
              role="alert"
            >
              <BsFillExclamationTriangleFill className="mr-2 inline-block" />
              <p className="font-bold">Warning: This post will be published.</p>
            </div>
          )}

          <div className="rw-button-group">
            <Submit
              disabled={props.loading}
              className="rw-button rw-button-blue"
            >
              Save
            </Submit>
          </div>
        </Form>
      </div>
    </>
  )
}

export default PostForm
