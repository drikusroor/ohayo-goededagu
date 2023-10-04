import getImageGalleriesCreateCommand from './create-image-galleries-command'

function generateManyPosts(amount: number, override?: Partial<Post>) {
  const posts = []

  for (let i = 0; i < amount; i++) {
    const postType =
      i % 5 === 0
        ? 'ARTICLE'
        : i % 5 === 1
        ? 'CHOTTO'
        : i % 5 === 2
        ? 'PHOTO_GALLERY'
        : i % 5 === 3
        ? 'VIDEO'
        : 'HAIKU'

    const post = {
      title: `Post ${i + 1}`,
      body: `This is my post number ${i + 1}`,
      published: true,
      userId: 1,
      location: '1 Chome-1-2 Oshiage, Sumida City, Tokyo 131-0045, Japan',
      type: postType,
      ...override,
    }

    if (postType === 'PHOTO_GALLERY') {
      post.imageGalleries = getImageGalleriesCreateCommand({
        galleriesAmount: 1,
        imagesAmount: 13,
      })
    }

    if (postType === 'VIDEO') {
      post.videoPost = {
        create: {
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
      }
    }

    posts.push(post)
  }
  return posts
}

export default generateManyPosts
