/*
  Warnings:

  - You are about to drop the column `file` on the `UploadPhoto` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `UploadPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UploadPhoto" DROP COLUMN "file",
ADD COLUMN     "image_url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "socialSignIn" SET DEFAULT false;
