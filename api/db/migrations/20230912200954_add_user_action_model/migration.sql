-- CreateEnum
CREATE TYPE "UserActionType" AS ENUM ('LOGIN');

-- CreateTable
CREATE TABLE "UserAction" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "action" "UserActionType" NOT NULL,
    "target" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,

    CONSTRAINT "UserAction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAction" ADD CONSTRAINT "UserAction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
