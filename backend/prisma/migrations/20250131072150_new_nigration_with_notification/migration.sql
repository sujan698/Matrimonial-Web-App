/*
  Warnings:

  - You are about to drop the `InterestUser` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `interest` on table `Interest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "InterestUser" DROP CONSTRAINT "InterestUser_interestId_fkey";

-- DropForeignKey
ALTER TABLE "InterestUser" DROP CONSTRAINT "InterestUser_userId_fkey";

-- AlterTable
ALTER TABLE "Interest" ALTER COLUMN "interest" SET NOT NULL;

-- DropTable
DROP TABLE "InterestUser";

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Interest" ADD CONSTRAINT "Interest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
