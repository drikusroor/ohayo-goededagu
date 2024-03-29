export default function getImageGalleriesCreateCommand({
  galleriesAmount = 1,
  imagesAmount = 6,
}) {
  const images = Array.from({ length: imagesAmount }, (_, i) => {
    const randomWidth = Math.floor(Math.random() * 200) + 100
    const randomHeight = Math.floor(Math.random() * 200) + 100
    return {
      imageId: `b1b9a0c0-9f0a-11eb-8dcd-0242ac13000${i}`,
      url: `https://picsum.photos/seed/${i}/${randomWidth}/${randomHeight}`,
    }
  })

  const galleries = Array.from({ length: galleriesAmount }, (_, i) => ({
    imageGallery: {
      create: {
        name: `Gallery ${i}`,
        description: `This is gallery ${i}`,
        images: {
          create: images.map((image) => ({
            // add gallery index to imageId to make it unique
            imageId: `${image.imageId}`,
            url: image.url,
          })),
        },
      },
    },
  }))
  return {
    create: galleries,
  }
}
