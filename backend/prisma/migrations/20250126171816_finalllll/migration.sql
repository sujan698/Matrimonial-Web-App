-- AlterTable
ALTER TABLE "PartnerPreference" ALTER COLUMN "ageRange" DROP DEFAULT,
ALTER COLUMN "residentialStatus" DROP DEFAULT,
ALTER COLUMN "educationLevel" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "residentialStatus" DROP DEFAULT,
ALTER COLUMN "familyType" DROP DEFAULT,
ALTER COLUMN "incomeRange" DROP DEFAULT,
ALTER COLUMN "educationLevel" DROP DEFAULT,
ALTER COLUMN "motherTongue" DROP DEFAULT;
