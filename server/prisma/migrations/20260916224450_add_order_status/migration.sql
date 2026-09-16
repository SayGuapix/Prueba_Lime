/*
  Warnings:

  - You are about to drop the column `status` on the `LabOrder` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "OrderStatus" (
    "code" TEXT NOT NULL PRIMARY KEY,
    "label" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_LabOrder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" INTEGER NOT NULL,
    "labTestId" INTEGER NOT NULL,
    "statusCode" TEXT NOT NULL DEFAULT 'PENDING',
    "requestedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "LabOrder_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LabOrder_labTestId_fkey" FOREIGN KEY ("labTestId") REFERENCES "LabTest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LabOrder_statusCode_fkey" FOREIGN KEY ("statusCode") REFERENCES "OrderStatus" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LabOrder" ("id", "labTestId", "patientId", "requestedAt") SELECT "id", "labTestId", "patientId", "requestedAt" FROM "LabOrder";
DROP TABLE "LabOrder";
ALTER TABLE "new_LabOrder" RENAME TO "LabOrder";
CREATE INDEX "LabOrder_patientId_idx" ON "LabOrder"("patientId");
CREATE INDEX "LabOrder_labTestId_idx" ON "LabOrder"("labTestId");
CREATE INDEX "LabOrder_statusCode_idx" ON "LabOrder"("statusCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
