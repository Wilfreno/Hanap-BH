/*
  Warnings:

  - You are about to drop the column `per_monrh` on the `Price` table. All the data in the column will be lost.
  - Added the required column `per_month` to the `Price` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Price" DROP COLUMN "per_monrh",
ADD COLUMN     "per_month" DECIMAL(65,30) NOT NULL;
