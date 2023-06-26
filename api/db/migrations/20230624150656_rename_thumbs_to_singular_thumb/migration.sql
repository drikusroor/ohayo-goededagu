/*
  Warnings:

  - You are about to drop the `Thumbs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Thumbs" DROP CONSTRAINT "Thumbs_commentId_fkey";

-- DropForeignKey
ALTER TABLE "Thumbs" DROP CONSTRAINT "Thumbs_userId_fkey";

-- DropTable
DROP TABLE "Thumbs";

-- CreateTable
CREATE TABLE "Thumb" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    "up" BOOLEAN NOT NULL,

    CONSTRAINT "Thumb_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Thumb" ADD CONSTRAINT "Thumb_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thumb" ADD CONSTRAINT "Thumb_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
