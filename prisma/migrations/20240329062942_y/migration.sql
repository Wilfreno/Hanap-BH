/*
  Warnings:

  - You are about to drop the column `owner_id` on the `Photo` table. All the data in the column will be lost.
  - You are about to drop the column `owner_type` on the `Photo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "owner_id",
DROP COLUMN "owner_type",
ALTER COLUMN "date_created" SET DEFAULT CURRENT_TIMESTAMP;
