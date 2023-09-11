import { UpsertImageGalleryOnCreatePostInput } from 'types/graphql'

import { db } from 'src/lib/db'

function upsertImageGalleriesOnPost(
  postId: number,
  imageGalleries: UpsertImageGalleryOnCreatePostInput[] = []
) {
  if (imageGalleries.length === 0) {
    return Promise.resolve([])
  }

  return imageGalleries.map(async (imageGallery) => {
    // id is the id of the imageGalleryOnPost record
    // imageGalleryId is the id of the imageGallery record
    const { id = 0, imageGalleryId = 0 } = imageGallery

    const { name, images } = imageGallery

    await db.imageGalleryOnPost.upsert({
      where: {
        id,
      },
      create: {
        post: {
          connect: { id: postId },
        },
        imageGallery: {
          create: {
            name,
            images: {
              create: images,
            },
          },
        },
      },
      update: {
        imageGallery: {
          upsert: {
            create: {
              name,
              images: {
                create: images,
              },
            },
            update: {
              images: {
                upsert: imageGallery.images.map((image) => ({
                  create: image,
                  update: image,
                  where: { id: image.id || 0 },
                })),
              },
            },
            where: { id: imageGalleryId },
          },
        },
      },
    })
  })
}

export default upsertImageGalleriesOnPost
