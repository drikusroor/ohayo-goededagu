/*
  Warnings:

  - You are about to drop the column `draft` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "draft",
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false;
