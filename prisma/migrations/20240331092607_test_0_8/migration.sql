/*
  Warnings:

  - You are about to drop the column `value` on the `Otp` table. All the data in the column will be lost.
  - Added the required column `pin` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Otp" DROP COLUMN "value",
ADD COLUMN     "pin" TEXT NOT NULL;
