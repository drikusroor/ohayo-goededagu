-- CreateTable
CREATE TABLE "VideoPost" (
    "id" SERIAL NOT NULL,
    "postId" INTEGER NOT NULL,
    "videoUrl" TEXT NOT NULL,

    CONSTRAINT "VideoPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoPost_postId_key" ON "VideoPost"("postId");

-- AddForeignKey
ALTER TABLE "VideoPost" ADD CONSTRAINT "VideoPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
