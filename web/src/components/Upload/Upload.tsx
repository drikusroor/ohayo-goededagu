import {
  BsArrowRightCircle,
  BsFillCheckCircleFill,
  BsFillCircleFill,
} from 'react-icons/bs'

import { ButtonField, FieldError, Label } from '@redwoodjs/forms'

import { useAuth } from 'src/auth'
import { classNames } from 'src/lib/class-names'

import ArticleTypeIcon, { EPostType } from '../ArticleTypeIcon/ArticleTypeIcon'
import Avatar from '../Avatar/Avatar'
import Button from '../Button/Button'

declare const cloudinary: any

export interface ICloudinaryUploadResultInfo {
  id: string
  batchId: string
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: Date
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  folder: string
  access_mode: string
  original_filename: string
  path: string
  thumbnail_url: string
}

interface IUploadProps {
  name: string
  postType: EPostType
  postTitle: string
  postBody: string
  coverImage?: string
  setCoverImage?: (value: ICloudinaryUploadResultInfo) => void
}

const Upload = ({
  name,
  coverImage,
  setCoverImage,
  postType,
  postTitle,
  postBody,
}: IUploadProps) => {
  const { currentUser } = useAuth()
  const widget = cloudinary.createUploadWidget(
    {
      cloudName: 'dl5elpdjy',
      uploadPreset: 'bcfnswai',
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        console.log('Done! Here is the image info: ', result.info)
        setCoverImage(result.info as ICloudinaryUploadResultInfo)
      }
    }
  )

  const onClickUpload = () => {
    widget.open()
  }

  const [blogRollPreview, setBlogRollPreview] = React.useState<boolean>(false)

  return (
    <>
      <ButtonField
        id="upload_widget"
        name={name}
        defaultValue="Upload cover image"
        className="rw-button rw-button-blue mt-4"
        errorClassName="rw-button rw-button-blue rw-button-error"
        onClick={() => {
          onClickUpload()
        }}
      />
      <FieldError name="upload" className="rw-field-error" />

      {coverImage && (
        <>
          <Label
            name="image preview type"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            Cover image preview for:
          </Label>
          <div className="mt-2 flex flex-row gap-0">
            <Button
              type="button"
              onClick={() => {
                setBlogRollPreview(false)
              }}
              className={classNames(
                'flex items-center gap-2 rounded-r-none hover:bg-rw-blue-600',
                !blogRollPreview ? 'bg-green-600 underline' : 'bg-rw-blue-500'
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
                blogRollPreview ? 'bg-green-600 underline' : 'bg-rw-blue-500'
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
                  backgroundImage: coverImage
                    ? `url(${coverImage})`
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
                      {currentUser?.name ? currentUser?.name : 'Your name'}
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
                  backgroundImage: coverImage
                    ? `url(${coverImage})`
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
                      <Avatar
                        alt={currentUser.name}
                        name={currentUser.name || currentUser.email}
                      />
                      <div className="flex flex-col items-start">
                        <span className="text-sm text-slate-300">
                          {currentUser?.name ? currentUser?.name : 'Your name'}
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
  )
}

export default Upload
