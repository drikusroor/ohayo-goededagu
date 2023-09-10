-- DropForeignKey
ALTER TABLE "ImageGalleryOnPost" DROP CONSTRAINT "ImageGalleryOnPost_imageGalleryId_fkey";

-- AddForeignKey
ALTER TABLE "ImageGalleryOnPost" ADD CONSTRAINT "ImageGalleryOnPost_imageGalleryId_fkey" FOREIGN KEY ("imageGalleryId") REFERENCES "ImageGallery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
