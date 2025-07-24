-- CreateTable
CREATE TABLE "courts_addresses" (
    "id" UUID NOT NULL,
    "court_id" UUID NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "complement" TEXT,

    CONSTRAINT "courts_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "courts_addresses_court_id_key" ON "courts_addresses"("court_id");

-- AddForeignKey
ALTER TABLE "courts_addresses" ADD CONSTRAINT "courts_addresses_court_id_fkey" FOREIGN KEY ("court_id") REFERENCES "courts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
