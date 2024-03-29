/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "user_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Photo_user_id_key" ON "Photo"("user_id");

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
