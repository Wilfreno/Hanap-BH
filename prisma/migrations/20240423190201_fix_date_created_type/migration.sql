-- AlterTable
ALTER TABLE "Favorite" ALTER COLUMN "date_created" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Location" ALTER COLUMN "date_created" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "date_created" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Price" ADD COLUMN     "date_created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
