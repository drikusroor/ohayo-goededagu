-- DropForeignKey
ALTER TABLE "ImageGalleryImage" DROP CONSTRAINT "ImageGalleryImage_imageGalleryId_fkey";

-- AddForeignKey
ALTER TABLE "ImageGalleryImage" ADD CONSTRAINT "ImageGalleryImage_imageGalleryId_fkey" FOREIGN KEY ("imageGalleryId") REFERENCES "ImageGallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
