-- DropForeignKey
ALTER TABLE "Rent" DROP CONSTRAINT "Rent_carId_fkey";

-- CreateTable
CREATE TABLE "RentHistory" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RentHistory" ADD CONSTRAINT "RentHistory_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
