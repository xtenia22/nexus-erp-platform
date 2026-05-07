-- CreateTable
CREATE TABLE "Category" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "erpId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT,
    "order" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProductLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "erpId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER,
    "categoryId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductLine_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductLine" ("createdAt", "erpId", "id", "name", "order", "updatedAt") SELECT "createdAt", "erpId", "id", "name", "order", "updatedAt" FROM "ProductLine";
DROP TABLE "ProductLine";
ALTER TABLE "new_ProductLine" RENAME TO "ProductLine";
CREATE UNIQUE INDEX "ProductLine_erpId_key" ON "ProductLine"("erpId");
CREATE INDEX "ProductLine_name_idx" ON "ProductLine"("name");
CREATE INDEX "ProductLine_categoryId_idx" ON "ProductLine"("categoryId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Category_erpId_key" ON "Category"("erpId");

-- CreateIndex
CREATE INDEX "Category_name_idx" ON "Category"("name");
