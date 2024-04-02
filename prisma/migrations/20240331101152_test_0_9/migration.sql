/*
  Warnings:

  - You are about to drop the column `lodgingId` on the `Photo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Photo" DROP CONSTRAINT "Photo_lodgingId_fkey";

-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "lodgingId",
ADD COLUMN     "lodging_id" TEXT;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_lodging_id_fkey" FOREIGN KEY ("lodging_id") REFERENCES "Lodging"("id") ON DELETE SET NULL ON UPDATE CASCADE;
