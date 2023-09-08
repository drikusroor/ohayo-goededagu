import { useMemo } from 'react'

import {
  BsFillSendFill,
  BsPencilSquare,
  BsFillCircleFill,
  BsFillCheckCircleFill,
  BsFillExclamationTriangleFill,
  BsFillXCircleFill,
  BsSaveFill,
} from 'react-icons/bs'
import type {
  CreateImageInput,
  EditPostById,
  UpdatePostInput,
} from 'types/graphql'

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
import { Link, routes } from '@redwoodjs/router'

import {
  EPostType,
  postTypeOptions,
} from 'src/components/ArticleTypeIcon/ArticleTypeIcon'
import Button from 'src/components/Button/Button'
import LocationPin from 'src/components/LocationPin/LocationPin'
import MarkdownEditor from 'src/components/MarkdownEditor/MarkdownEditor'
import Preview from 'src/components/Upload/Preview/Preview'
import Upload, {
  ICloudinaryUploadResultInfo,
} from 'src/components/Upload/Upload/Upload'
import { classNames } from 'src/lib/class-names'

import VideoForm, { IVideoPostFormData } from './TypeForms/VideoForm'

type FormPost = NonNullable<EditPostById['post']>

interface PostFormProps {
  post?: EditPostById['post']
  profile?: EditPostById['profile']
  onSave: (data: UpdatePostInput, id?: FormPost['id']) => void
  error: RWGqlError
  loading: boolean
}

const PostForm = (props: PostFormProps) => {
  const onSubmit = (data: FormPost) => {
    data.published = published

    if (data.type === EPostType.VIDEO) {
      delete data.videoUrl
      data.videoPost = videoPostFormData
    }

    if (coverImage && typeof coverImage === 'object') {
      delete data.coverImage
      const { id, imageId, url } = coverImage
      data.coverImage = {
        id,
        imageId,
        url,
      }
    }

    props.onSave(data, props?.post?.id)
  }

  const [published, setPublished] = React.useState<boolean>(
    props.post?.published || false
  )

  const [postType, setPostType] = React.useState<EPostType>(
    (props.post?.type as EPostType) || EPostType.ARTICLE
  )

  const [coverImage, setCoverImage] = React.useState<CreateImageInput>(
    props.post?.coverImage
  )

  const [postTitle, setPostTitle] = React.useState<string>(props.post?.title)

  const [postBody, setPostBody] = React.useState<string>(props.post?.body)

  const [postLocation, setPostLocation] = React.useState<string>(
    props.post?.location
  )

  const [imageGalleries, setImageGalleries] = React.useState<object>(
    props?.post?.imageGalleries
  )

  const [videoPostFormData, setVideoPostFormData] =
    React.useState<IVideoPostFormData>({
      videoUrl: props.post?.videoPost?.videoUrl || '',
    })

  const previewPostData = useMemo(() => {
    const article = {
      ...props.post,
      id: props.post?.id ? props.post?.id : '',
      title: postTitle,
      body: postBody,
      type: postType,
      createdAt: props.post?.createdAt
        ? props.post?.createdAt
        : new Date().toString(),
      updatedAt: props.post?.createdAt
        ? props.post?.createdAt
        : new Date().toString(),
      coverImage,
      videoPost: videoPostFormData,
      comments: [],
      user: {
        ...props.post?.user,
        profile: props.profile ? props.profile : {},
      },
      imageGalleries,
      location: postLocation,
    }

    return article
  }, [
    coverImage,
    postBody,
    postTitle,
    postType,
    props.post,
    props.profile,
    videoPostFormData,
    postLocation,
    imageGalleries,
  ])

  const bodyNotRequired =
    postType === EPostType.VIDEO || postType === EPostType.PHOTO_GALLERY

  const handleSetImageGalleries = (images) => {
    const gallery = []
    for (const [key, image] of Object.entries(images)) {
      gallery.push({ imageId: image.public_id, url: image.secure_url })
    }
    setImageGalleries({
      imageGallery: {
        images: gallery,
      },
    })
  }

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

          <MarkdownEditor
            name="body"
            value={postBody}
            onChange={setPostBody}
            validation={{
              required: !bodyNotRequired,
            }}
          />

          <FieldError name="body" className="rw-field-error" />

          <Label
            name="location"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Location
          </Label>

          <TextField
            name="location"
            value={postLocation}
            onChange={(e) => {
              setPostLocation(e.target.value)
            }}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />

          <LocationPin location={postLocation} className="mt-2">
            {postLocation}
          </LocationPin>

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
              <div className="mt-4">
                <Upload
                  name="coverImage"
                  multiple={false}
                  handleUpload={([{ public_id, secure_url }]) =>
                    setCoverImage({
                      imageId: public_id,
                      url: secure_url,
                    })
                  }
                />
                <Upload
                  name="imageGalleries"
                  multiple={true}
                  handleUpload={({ ...images }) => {
                    handleSetImageGalleries(
                      images as ICloudinaryUploadResultInfo[]
                    )
                  }}
                />
              </div>
            </>
          )}

          {postType === EPostType.PHOTO_GALLERY && (
            <Upload
              name="imageGalleries"
              multiple={true}
              handleUpload={({ ...images }) => {
                handleSetImageGalleries(images as ICloudinaryUploadResultInfo[])
              }}
            />
          )}

          {postType === EPostType.ARTICLE && (
            <div className="mt-4">
              <Upload
                name="coverImage"
                multiple={false}
                handleUpload={([{ public_id, secure_url }]) =>
                  setCoverImage({
                    imageId: public_id,
                    url: secure_url,
                  })
                }
              />
            </div>
          )}

          <Preview post={previewPostData} />

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
              className="rw-button rw-button-blue flex items-center gap-2 text-sm"
            >
              <BsSaveFill />
              Save
            </Submit>

            <Link
              to={routes.posts({ id: props.post?.id })}
              title={'Back to overview'}
            >
              <Button
                type="button"
                className="rw-button rw-button-red group relative flex items-center gap-2 text-sm"
              >
                <BsFillXCircleFill />
                Cancel
                <span className="user-select-none absolute left-full ml-2 w-32 text-left text-xs text-monza-red-500 opacity-0 transition-opacity group-hover:opacity-100">
                  Warning: All unsaved changes will be lost.
                </span>
              </Button>
            </Link>
          </div>
        </Form>
      </div>
    </>
  )
}

export default PostForm
