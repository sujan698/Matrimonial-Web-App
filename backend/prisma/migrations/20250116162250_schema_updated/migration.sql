-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'NonBinary');

-- CreateEnum
CREATE TYPE "Religion" AS ENUM ('hinduism', 'buddhism', 'islam', 'christianity', 'others');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('single', 'widowed', 'divorced');

-- CreateEnum
CREATE TYPE "ProvinceName" AS ENUM ('Bagmati', 'Gandaki', 'Koshi', 'Karnali', 'Lumbini', 'Madhesh', 'Sudurpaschim');

-- CreateEnum
CREATE TYPE "DietPreference" AS ENUM ('Veg', 'NonVeg', 'Eggiterian', 'Vegan', 'NoPreference');

-- CreateEnum
CREATE TYPE "EducationLevel" AS ENUM ('PrimaryLevel', 'SecondaryLevel', 'HigherSecondaryLevel', 'Bachelor', 'Masters', 'PhD', 'Diploma');

-- CreateEnum
CREATE TYPE "EmploymentStatus" AS ENUM ('Employed', 'SelfEmployed', 'Student', 'Unemployed', 'Retired');

-- CreateEnum
CREATE TYPE "FamilyType" AS ENUM ('Joint', 'Nuclear', 'Extended');

-- CreateEnum
CREATE TYPE "ResidentialStatus" AS ENUM ('NepaliCitizen', 'PRHolder', 'NRN');

-- CreateEnum
CREATE TYPE "FamilyClass" AS ENUM ('MiddleClass', 'UpperClass', 'LowerClass');

-- CreateEnum
CREATE TYPE "Ethnicity" AS ENUM ('Brahmin', 'Chhetri', 'Newar', 'Gurung', 'Magar', 'Rai', 'Limbu', 'Tamang', 'Sherpa', 'Thakuri', 'Dalit', 'Madhesi', 'Janajati', 'Others');

-- CreateEnum
CREATE TYPE "FamilyValue" AS ENUM ('Traditional', 'Modern', 'Liberal');

-- CreateEnum
CREATE TYPE "MotherTongue" AS ENUM ('Nepali', 'Newari', 'Maithili', 'Bhojpuri', 'Tharu', 'Tamang', 'Sherpa', 'Gurung', 'Magar', 'Rai', 'Limbu', 'Others');

-- CreateEnum
CREATE TYPE "Interests" AS ENUM ('Animals', 'Travel', 'Food', 'Sports', 'Art', 'Movie', 'Music', 'Dancing', 'Singing', 'Comedy', 'Beauty', 'Science', 'Reading', 'Technology', 'Cooking', 'Fitness', 'Shopping', 'Writing', 'Business', 'Others');

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "roleId" INTEGER,
    "role" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "socialSignIn" BOOLEAN NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" SERIAL NOT NULL,
    "provinceName" "ProvinceName" NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" SERIAL NOT NULL,
    "provinceId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "profilePic" TEXT,
    "dietPreference" "DietPreference" NOT NULL,
    "ageRange" INTEGER NOT NULL,
    "dateOfBirth" TEXT NOT NULL,
    "religion" "Religion" NOT NULL,
    "districtId" INTEGER NOT NULL,
    "residentialStatus" "ResidentialStatus" NOT NULL DEFAULT 'NepaliCitizen',
    "familyType" "FamilyType" NOT NULL DEFAULT 'Nuclear',
    "height" DOUBLE PRECISION NOT NULL,
    "incomeRange" INTEGER NOT NULL DEFAULT 0,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "educationLevel" "EducationLevel" NOT NULL DEFAULT 'PrimaryLevel',
    "employmentStatus" "EmploymentStatus" NOT NULL,
    "motherTongue" "MotherTongue" NOT NULL DEFAULT 'Nepali',
    "partnerPreference" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "messageContent" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL,
    "readAt" TIMESTAMP(3),

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "userOneId" INTEGER NOT NULL,
    "userTwoId" INTEGER NOT NULL,
    "matchDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("userOneId","userTwoId")
);

-- CreateTable
CREATE TABLE "Interest" (
    "id" SERIAL NOT NULL,
    "interest" "Interests",

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterestUser" (
    "userId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,

    CONSTRAINT "InterestUser_pkey" PRIMARY KEY ("userId","interestId")
);

-- CreateTable
CREATE TABLE "FamilyDetails" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "ethnicity" "Ethnicity" NOT NULL,
    "familyValues" "FamilyValue" NOT NULL,
    "familyClass" "FamilyClass" NOT NULL,
    "religion" "Religion" NOT NULL,
    "gotra" TEXT NOT NULL,

    CONSTRAINT "FamilyDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "reportContent" TEXT NOT NULL,
    "reportDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadPhoto" (
    "id" SERIAL NOT NULL,
    "file" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UploadPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartnerPreference" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "maritalStatus" "MaritalStatus" NOT NULL,
    "ageRange" INTEGER NOT NULL DEFAULT 0,
    "dietPreference" "DietPreference" NOT NULL,
    "religion" "Religion" NOT NULL,
    "familyValues" "FamilyValue" NOT NULL,
    "ethnicity" "Ethnicity" NOT NULL,
    "familyClass" "FamilyClass" NOT NULL,
    "residentialStatus" "ResidentialStatus" NOT NULL DEFAULT 'NepaliCitizen',
    "employmentStatus" "EmploymentStatus" NOT NULL,
    "educationLevel" "EducationLevel" NOT NULL DEFAULT 'PrimaryLevel',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FamilyDetails_userId_key" ON "FamilyDetails"("userId");

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_userOneId_fkey" FOREIGN KEY ("userOneId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_userTwoId_fkey" FOREIGN KEY ("userTwoId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestUser" ADD CONSTRAINT "InterestUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestUser" ADD CONSTRAINT "InterestUser_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyDetails" ADD CONSTRAINT "FamilyDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadPhoto" ADD CONSTRAINT "UploadPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerPreference" ADD CONSTRAINT "PartnerPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
