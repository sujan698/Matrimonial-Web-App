/*
  Warnings:

  - The values [single,widowed,divorced] on the enum `MaritalStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [hinduism,buddhism,islam,christianity,others] on the enum `Religion` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MaritalStatus_new" AS ENUM ('Single', 'Widowed', 'Divorced', 'NoPreference');
ALTER TABLE "DemographicDetails" ALTER COLUMN "maritalStatus" TYPE "MaritalStatus_new" USING ("maritalStatus"::text::"MaritalStatus_new");
ALTER TABLE "PartnerPreference" ALTER COLUMN "maritalStatus" TYPE "MaritalStatus_new" USING ("maritalStatus"::text::"MaritalStatus_new");
ALTER TYPE "MaritalStatus" RENAME TO "MaritalStatus_old";
ALTER TYPE "MaritalStatus_new" RENAME TO "MaritalStatus";
DROP TYPE "MaritalStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Religion_new" AS ENUM ('Hinduism', 'Buddhism', 'Islam', 'Christianity', 'Others', 'NoPreference');
ALTER TABLE "FamilyDetails" ALTER COLUMN "religion" TYPE "Religion_new" USING ("religion"::text::"Religion_new");
ALTER TABLE "PartnerPreference" ALTER COLUMN "religion" TYPE "Religion_new" USING ("religion"::text::"Religion_new");
ALTER TYPE "Religion" RENAME TO "Religion_old";
ALTER TYPE "Religion_new" RENAME TO "Religion";
DROP TYPE "Religion_old";
COMMIT;

-- AlterTable
ALTER TABLE "DemographicDetails" ALTER COLUMN "height" SET DATA TYPE TEXT;
