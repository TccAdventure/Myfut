-- CreateTable
CREATE TABLE "court_availabilities" (
    "id" UUID NOT NULL,
    "court_id" UUID NOT NULL,
    "weekday" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,

    CONSTRAINT "court_availabilities_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "court_availabilities" ADD CONSTRAINT "court_availabilities_court_id_fkey" FOREIGN KEY ("court_id") REFERENCES "courts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
