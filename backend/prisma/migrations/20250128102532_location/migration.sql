/*
  Warnings:

  - You are about to drop the column `district` on the `DemographicDetails` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `DemographicDetails` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `provinceName` on the `Province` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "DemographicDetails" DROP COLUMN "district",
DROP COLUMN "province",
ADD COLUMN     "districtId" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "provinceId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Province" DROP COLUMN "provinceName",
ADD COLUMN     "provinceName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Profile";

-- DropEnum
DROP TYPE "ProvinceName";

-- AddForeignKey
ALTER TABLE "DemographicDetails" ADD CONSTRAINT "DemographicDetails_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DemographicDetails" ADD CONSTRAINT "DemographicDetails_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
