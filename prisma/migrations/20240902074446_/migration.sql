/*
  Warnings:

  - You are about to alter the column `totalAmount` on the `Rent` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to alter the column `totalAmount` on the `RentHistory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Rent" ALTER COLUMN "totalAmount" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "RentHistory" ALTER COLUMN "totalAmount" SET DATA TYPE INTEGER;
