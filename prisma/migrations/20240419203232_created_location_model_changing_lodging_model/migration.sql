/*
  Warnings:

  - You are about to drop the column `latitude` on the `Lodging` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Lodging` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Lodging" DROP COLUMN "latitude",
DROP COLUMN "longitude";

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "street" TEXT,
    "province" TEXT NOT NULL,
    "municipality_city" TEXT NOT NULL,
    "barangay" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_id_key" ON "Location"("id");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_id_fkey" FOREIGN KEY ("id") REFERENCES "Lodging"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
