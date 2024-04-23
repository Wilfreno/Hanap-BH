/*
  Warnings:

  - You are about to drop the column `price` on the `Room` table. All the data in the column will be lost.
  - Made the column `date_created` on table `Otp` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `add_ons` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bed_count` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "date_created" SET NOT NULL;

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "price",
ADD COLUMN     "add_ons" TEXT NOT NULL,
ADD COLUMN     "bed_count" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL,
    "per_hour" DECIMAL(65,30) NOT NULL,
    "per_six_hour" DECIMAL(65,30) NOT NULL,
    "per_12_hours" DECIMAL(65,30) NOT NULL,
    "per_night" DECIMAL(65,30) NOT NULL,
    "per_monrh" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Price_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "lodging_id" TEXT NOT NULL,
    "date_created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_id_key" ON "Favorite"("id");

-- AddForeignKey
ALTER TABLE "Price" ADD CONSTRAINT "Price_id_fkey" FOREIGN KEY ("id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_lodging_id_fkey" FOREIGN KEY ("lodging_id") REFERENCES "Lodging"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
