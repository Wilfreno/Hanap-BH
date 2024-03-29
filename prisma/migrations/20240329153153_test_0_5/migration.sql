/*
  Warnings:

  - You are about to drop the column `heigth` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "heigth",
ADD COLUMN     "height" INTEGER;
