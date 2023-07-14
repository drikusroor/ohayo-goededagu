import {
  BsFillSendFill,
  BsPencilSquare,
  BsFillCircleFill,
  BsFillCheckCircleFill,
  BsFillExclamationTriangleFill,
  BsArrowRightCircle,
} from 'react-icons/bs'
import type { EditPostById, UpdatePostInput } from 'types/graphql'
import { User } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  SelectField,
  CheckboxField,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

import ArticleTypeIcon, {
  EPostType,
  postTypeOptions,
} from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import Avatar from 'src/components/Avatar/Avatar'
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

  const [postTitle, setPostTitle] = React.useState<string>(props.post?.title)

  const [postBody, setPostBody] = React.useState<string>(props.post?.body)

  const [videoPostFormData, setVideoPostFormData] =
    React.useState<IVideoPostFormData>({
      videoUrl: props.post?.videoPost?.videoUrl || '',
    })

  const [blogRollPreview, setBlogRollPreview] = React.useState<boolean>(false)

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
            defaultValue={postTitle}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            onChange={(e) => {
              setPostTitle(e.target.value)
            }}
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
            defaultValue={postBody}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            onChange={(e) => {
              setPostBody(e.target.value)
            }}
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
            <>
              <Upload
                name="coverImage"
                postType={postType}
                postTitle={postTitle}
                value={coverImage?.url}
                setValue={({ public_id, secure_url }) =>
                  setCoverImage({
                    imageId: public_id,
                    url: secure_url,
                  })
                }
              />

              {coverImage && (
                <>
                  <Label
                    name="image preview type"
                    className="rw-label"
                    errorClassName="rw-label rw-label-error"
                  >
                    Image preview for:
                  </Label>
                  <div className="mt-2 flex flex-row gap-0">
                    <Button
                      type="button"
                      onClick={() => {
                        setBlogRollPreview(false)
                      }}
                      className={classNames(
                        'flex items-center gap-2 rounded-r-none hover:bg-rw-blue-600',
                        !blogRollPreview
                          ? 'bg-green-600 underline'
                          : 'bg-rw-blue-500'
                      )}
                    >
                      Full Article
                      {!blogRollPreview ? (
                        <BsFillCheckCircleFill />
                      ) : (
                        <BsFillCircleFill />
                      )}
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        setBlogRollPreview(true)
                      }}
                      className={classNames(
                        'flex items-center gap-2 rounded-l-none hover:bg-rw-blue-600',
                        blogRollPreview
                          ? 'bg-green-600 underline'
                          : 'bg-rw-blue-500'
                      )}
                    >
                      Blog Roll
                      {blogRollPreview ? (
                        <BsFillCheckCircleFill />
                      ) : (
                        <BsFillCircleFill />
                      )}
                    </Button>
                  </div>
                  {!blogRollPreview && (
                    <div className="mt-2 grid max-w-6xl">
                      <section
                        style={{
                          backgroundImage: coverImage.url
                            ? `url(${coverImage.url})`
                            : `url(/images/logo-full.png)`,
                        }}
                        className="rounded bg-gray-400 bg-cover bg-center bg-no-repeat bg-blend-multiply"
                      >
                        <div className="mx-auto flex aspect-video max-w-screen-xl flex-col justify-end px-4">
                          <div className="flex flex-row items-center justify-start gap-2">
                            <div>
                              <ArticleTypeIcon type={postType as EPostType} />
                            </div>
                            <h1 className="flex items-center gap-2 text-3xl font-extrabold uppercase leading-none tracking-tight text-white drop-shadow-xl md:gap-4 md:text-5xl lg:text-6xl">
                              {postTitle ? postTitle : 'Title'}
                            </h1>
                          </div>
                          <div className="flex flex-row items-center gap-2 pb-2">
                            <span className="text-sm text-slate-200">
                              Your name
                            </span>
                            <span className="text-sm text-slate-200">
                              | 11-11-2011 11:11
                            </span>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}

                  {blogRollPreview && (
                    <div className="mt-2 grid max-w-6xl">
                      <section
                        style={{
                          backgroundImage: coverImage?.url
                            ? `url(${coverImage.url})`
                            : `url(/images/logo-full.png)`,
                        }}
                        className="rounded bg-gray-600 bg-cover bg-center bg-no-repeat bg-blend-multiply"
                      >
                        <div className="mx-auto max-w-screen-xl px-4 py-20 md:py-24 lg:py-56">
                          <div className="flex flex-row items-center justify-center gap-2 pb-2">
                            <div>
                              <ArticleTypeIcon type={postType as EPostType} />
                            </div>

                            <h1 className="flex flex-wrap items-center justify-center text-3xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl">
                              {postTitle ? postTitle : 'Title'}
                            </h1>
                          </div>
                          <p className="mb-8 line-clamp-3 text-center text-lg font-normal text-gray-300 sm:px-16 lg:px-48 lg:text-xl">
                            {postBody}
                          </p>
                          <div className="flex flex-row items-center justify-center gap-12">
                            <div className="flex flex-row items-center gap-2">
                              <Avatar />
                              <div className="flex flex-col items-start">
                                <span className="text-sm text-slate-300">
                                  Your name
                                </span>
                                <span className="text-sm text-slate-300">
                                  11-11-2011 11:11
                                </span>
                              </div>
                            </div>
                            <a className="items-center justify-end text-center text-base font-medium text-white focus:ring-4 focus:ring-gray-400">
                              <Button className="flex max-w-fit items-center justify-end gap-2 px-4 py-3 text-xs">
                                <span className="hidden sm:inline-block">
                                  Lees verder
                                </span>
                                <BsArrowRightCircle />
                              </Button>
                            </a>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}
                </>
              )}
            </>
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
