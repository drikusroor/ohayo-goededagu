interface Props {
  photoGallery: object
}

const PhotoGrid = ({ photoGallery }: Props) => {
  return (
    <>
      <div className="mt-4 bg-gray-200 p-2">
        <ul className="flex flex-wrap gap-4">
          {photoGallery?.map((photo) => {
            return (
              <>
                <li className="relative h-[300px] grow basis-auto last:flex-initial">
                  <img
                    className="h-full w-full rounded-md object-cover align-middle"
                    key={photo.id}
                    src={photo.secure_url}
                    alt={photo.original_filename}
                  />
                </li>
              </>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default PhotoGrid
