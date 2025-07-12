/*
  Warnings:

  - You are about to drop the column `blockerId` on the `Block` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Block" DROP CONSTRAINT "Block_blockerId_fkey";

-- AlterTable
ALTER TABLE "Block" DROP COLUMN "blockerId";
