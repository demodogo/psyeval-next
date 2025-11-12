/*
  Warnings:

  - You are about to drop the column `evaluationId` on the `EvaluationAccess` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "EvaluationAccess" DROP CONSTRAINT "EvaluationAccess_evaluationId_fkey";

-- AlterTable
ALTER TABLE "EvaluationAccess" DROP COLUMN "evaluationId";
