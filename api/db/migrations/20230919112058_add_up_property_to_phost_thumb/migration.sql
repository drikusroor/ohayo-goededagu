/*
  Warnings:

  - Added the required column `up` to the `PostThumb` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PostThumb" ADD COLUMN     "up" BOOLEAN NOT NULL;
