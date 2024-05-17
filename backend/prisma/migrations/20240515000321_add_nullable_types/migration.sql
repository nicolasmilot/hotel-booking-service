/*
  Warnings:

  - You are about to drop the column `endAt` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "Availability" DROP CONSTRAINT "Availability_hotelRoomId_fkey";

-- AlterTable
ALTER TABLE "Availability" ALTER COLUMN "hotelRoomId" DROP NOT NULL,
ALTER COLUMN "bookingId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "endAt",
DROP COLUMN "startAt";

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_hotelRoomId_fkey" FOREIGN KEY ("hotelRoomId") REFERENCES "HotelRoom"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
