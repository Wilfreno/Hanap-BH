-- AlterTable
ALTER TABLE "Lodging" ALTER COLUMN "date_created" DROP NOT NULL;

-- AlterTable
ALTER TABLE "OTP" ADD COLUMN     "date_created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Photo" ALTER COLUMN "date_created" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "date_created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "date_created" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "date_created" DROP NOT NULL;
