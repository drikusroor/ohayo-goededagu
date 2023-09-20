-- CreateTable
CREATE TABLE "PostThumb" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "postId" INTEGER NOT NULL,

    CONSTRAINT "PostThumb_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostThumb" ADD CONSTRAINT "PostThumb_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostThumb" ADD CONSTRAINT "PostThumb_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
