-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "lodgingId" TEXT;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_lodgingId_fkey" FOREIGN KEY ("lodgingId") REFERENCES "Lodging"("id") ON DELETE SET NULL ON UPDATE CASCADE;
