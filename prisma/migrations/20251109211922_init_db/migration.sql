-- CreateEnum
CREATE TYPE "EvaluationAccessStatus" AS ENUM ('pending', 'used', 'revoked');

-- CreateEnum
CREATE TYPE "EvaluationResultStatus" AS ENUM ('not_started', 'in_progress', 'completed', 'pending_review', 'reviewed');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "lastName" TEXT,
    "password_hash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "disabledAt" TIMESTAMP(3),

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluationAccess" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "evaluationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "assignedTo" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "usedAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "participantEmail" TEXT NOT NULL,
    "participantFirstName" TEXT NOT NULL,
    "participantLastName" TEXT NOT NULL,
    "evaluationAccessStatus" "EvaluationAccessStatus" NOT NULL DEFAULT 'pending',
    "evaluationResultStatus" "EvaluationResultStatus" NOT NULL DEFAULT 'not_started',

    CONSTRAINT "EvaluationAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Evaluation_slug_key" ON "Evaluation"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "EvaluationAccess_token_key" ON "EvaluationAccess"("token");

-- AddForeignKey
ALTER TABLE "EvaluationAccess" ADD CONSTRAINT "EvaluationAccess_evaluationId_fkey" FOREIGN KEY ("evaluationId") REFERENCES "Evaluation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationAccess" ADD CONSTRAINT "EvaluationAccess_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluationAccess" ADD CONSTRAINT "EvaluationAccess_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
