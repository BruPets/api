/*
  Warnings:

  - You are about to drop the column `descripion` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `descripion`,
    ADD COLUMN `description` VARCHAR(191) NULL;
