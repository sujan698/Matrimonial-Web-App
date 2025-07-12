/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Interest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Interest" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Interest_userId_key" ON "Interest"("userId");
