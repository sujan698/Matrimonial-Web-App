/*
  Warnings:

  - You are about to drop the column `partnerPreference` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `province` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "partnerPreference",
ADD COLUMN     "province" "ProvinceName" NOT NULL,
ALTER COLUMN "incomeRange" SET DATA TYPE TEXT;
