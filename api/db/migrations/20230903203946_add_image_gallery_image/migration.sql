/*
  Warnings:

  - You are about to drop the column `imageId` on the `ImageGallery` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `ImageGallery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ImageGallery" DROP COLUMN "imageId",
DROP COLUMN "url";

-- CreateTable
CREATE TABLE "ImageGalleryImage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "imageId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "imageGalleryId" INTEGER NOT NULL,

    CONSTRAINT "ImageGalleryImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ImageGalleryImage" ADD CONSTRAINT "ImageGalleryImage_imageGalleryId_fkey" FOREIGN KEY ("imageGalleryId") REFERENCES "ImageGallery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
