-- CreateTable
CREATE TABLE "Thumbs" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "commentId" INTEGER NOT NULL,
    "up" BOOLEAN NOT NULL,

    CONSTRAINT "Thumbs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Thumbs" ADD CONSTRAINT "Thumbs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Thumbs" ADD CONSTRAINT "Thumbs_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
