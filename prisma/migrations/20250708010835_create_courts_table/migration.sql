-- CreateTable
CREATE TABLE "courts" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "link_to_google_maps" TEXT,

    CONSTRAINT "courts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "courts" ADD CONSTRAINT "courts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
