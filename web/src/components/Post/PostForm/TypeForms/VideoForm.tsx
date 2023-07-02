import { Label, InputField } from '@redwoodjs/forms'

export interface IVideoPostFormData {
  videoUrl: string
}

interface VideoFormProps {
  videoPostFormData?: IVideoPostFormData
  setVideoPostFormData: (data: IVideoPostFormData) => void
}

const VideoForm = (props: VideoFormProps) => {
  const updateVideoPostFormData = (
    key: 'videoUrl',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setVideoPostFormData({
      ...props.videoPostFormData,
      [key]: e.target.value,
    })
  }

  console.log('props.videoPostFormData', props.videoPostFormData)

  return (
    <div>
      <Label
        name="videoUrl"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Video URL
      </Label>
      <InputField
        name="videoUrl"
        defaultValue={props.videoPostFormData?.videoUrl}
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
        onChange={(e) => updateVideoPostFormData('videoUrl', e)}
      />
    </div>
  )
}

export default VideoForm
