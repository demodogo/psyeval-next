-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('admin', 'evaluator');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "RoleEnum" NOT NULL DEFAULT 'evaluator';

-- CreateTable
CREATE TABLE "UserInvitation" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "usedAt" TIMESTAMP(3),
    "didCreateAccount" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserInvitation_email_key" ON "UserInvitation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserInvitation_token_key" ON "UserInvitation"("token");
