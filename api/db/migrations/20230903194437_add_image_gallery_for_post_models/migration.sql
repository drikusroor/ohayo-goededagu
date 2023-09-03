-- CreateTable
CREATE TABLE "ImageGallery" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "ImageGallery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImageGalleryOnPost" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageGalleryId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "ImageGalleryOnPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageGalleryOnPost" ADD CONSTRAINT "ImageGalleryOnPost_imageGalleryId_fkey" FOREIGN KEY ("imageGalleryId") REFERENCES "ImageGallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageGalleryOnPost" ADD CONSTRAINT "ImageGalleryOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
