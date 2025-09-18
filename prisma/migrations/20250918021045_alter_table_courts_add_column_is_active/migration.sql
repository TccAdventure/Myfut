/*
  Warnings:

  - You are about to drop the column `endTime` on the `court_availabilities` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `court_availabilities` table. All the data in the column will be lost.
  - Added the required column `end_time` to the `court_availabilities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `court_availabilities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "court_availabilities" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "end_time" TEXT NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "start_time" TEXT NOT NULL;
