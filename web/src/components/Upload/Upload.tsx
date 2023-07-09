import { ButtonField, FieldError } from '@redwoodjs/forms'

const Upload = () => {
  const [image, setImage] = React.useState<string>()

  const widget = cloudinary.createUploadWidget(
    {
      cloudName: 'dl5elpdjy',
      uploadPreset: 'bcfnswai',
    },
    (error, result) => {
      if (!error && result && result.event === 'success') {
        setImage(result.info.url)
      }
    }
  )

  const onClickUpload = () => {
    widget.open()
  }

  return (
    <>
      <ButtonField
        id="upload_widget"
        name="upload"
        defaultValue="Upload image"
        className="rw-button rw-button-blue mt-4"
        errorClassName="rw-button rw-button-blue rw-button-error"
        onClick={() => {
          onClickUpload()
        }}
      />

      <FieldError name="upload" className="rw-field-error" />

      {image && <img alt="cover" src={image} />}
    </>
  )
}

export default Upload
