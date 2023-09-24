-- DropForeignKey
ALTER TABLE "ImageGalleryOnPost" DROP CONSTRAINT "ImageGalleryOnPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "PostThumb" DROP CONSTRAINT "PostThumb_postId_fkey";

-- DropForeignKey
ALTER TABLE "Thumb" DROP CONSTRAINT "Thumb_commentId_fkey";

-- DropForeignKey
ALTER TABLE "VideoPost" DROP CONSTRAINT "VideoPost_postId_fkey";

-- AddForeignKey
ALTER TABLE "PostThumb" ADD CONSTRAINT "PostThumb_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoPost" ADD CONSTRAINT "VideoPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thumb" ADD CONSTRAINT "Thumb_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImageGalleryOnPost" ADD CONSTRAINT "ImageGalleryOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
