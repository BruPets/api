/*
  Warnings:

  - You are about to drop the column `descriprion` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `descriprion`,
    ADD COLUMN `descripion` VARCHAR(191) NULL;
