-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
