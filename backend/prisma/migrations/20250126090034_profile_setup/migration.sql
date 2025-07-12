/*
  Warnings:

  - You are about to drop the `District` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "IncomeRange" AS ENUM ('very_low', 'low', 'medium', 'high', 'very_high', 'unemployed');

-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_districtId_fkey";

-- DropTable
DROP TABLE "District";

-- DropTable
DROP TABLE "Province";

-- CreateTable
CREATE TABLE "DemographicDetails" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "residentialStatus" "ResidentialStatus" NOT NULL,
    "province" "ProvinceName" NOT NULL,
    "district" TEXT NOT NULL,
    "educationLevel" "EducationLevel" NOT NULL,
    "employmentStatus" "EmploymentStatus" NOT NULL,
    "dietPreference" "DietPreference" NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "incomeRange" TEXT NOT NULL,
    "motherTongue" "MotherTongue" NOT NULL,

    CONSTRAINT "DemographicDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DemographicDetails_userId_key" ON "DemographicDetails"("userId");

-- AddForeignKey
ALTER TABLE "DemographicDetails" ADD CONSTRAINT "DemographicDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
