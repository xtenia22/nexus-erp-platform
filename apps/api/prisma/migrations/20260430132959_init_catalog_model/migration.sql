-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "erpId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "primaryMaterial" INTEGER,
    "image1Url" TEXT,
    "image2Url" TEXT,
    "brochureUrl" TEXT,
    "videoUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "erpId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "VehicleModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "erpId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER,
    "brandId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "VehicleModel_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProductLine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "erpId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ProductFitment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "vehicleModelId" INTEGER NOT NULL,
    "productLineId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "observation" TEXT,
    "groupId" INTEGER,
    "sequence" INTEGER,
    "yearFrom" INTEGER,
    "yearTo" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProductFitment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductFitment_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductFitment_vehicleModelId_fkey" FOREIGN KEY ("vehicleModelId") REFERENCES "VehicleModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductFitment_productLineId_fkey" FOREIGN KEY ("productLineId") REFERENCES "ProductLine" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_erpId_key" ON "Product"("erpId");

-- CreateIndex
CREATE INDEX "Product_code_idx" ON "Product"("code");

-- CreateIndex
CREATE INDEX "Product_isActive_idx" ON "Product"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_erpId_key" ON "Brand"("erpId");

-- CreateIndex
CREATE INDEX "Brand_name_idx" ON "Brand"("name");

-- CreateIndex
CREATE INDEX "VehicleModel_name_idx" ON "VehicleModel"("name");

-- CreateIndex
CREATE INDEX "VehicleModel_brandId_idx" ON "VehicleModel"("brandId");

-- CreateIndex
CREATE UNIQUE INDEX "VehicleModel_brandId_erpId_key" ON "VehicleModel"("brandId", "erpId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductLine_erpId_key" ON "ProductLine"("erpId");

-- CreateIndex
CREATE INDEX "ProductLine_name_idx" ON "ProductLine"("name");

-- CreateIndex
CREATE INDEX "ProductFitment_description_idx" ON "ProductFitment"("description");

-- CreateIndex
CREATE INDEX "ProductFitment_brandId_idx" ON "ProductFitment"("brandId");

-- CreateIndex
CREATE INDEX "ProductFitment_vehicleModelId_idx" ON "ProductFitment"("vehicleModelId");

-- CreateIndex
CREATE INDEX "ProductFitment_productLineId_idx" ON "ProductFitment"("productLineId");

-- CreateIndex
CREATE INDEX "ProductFitment_yearFrom_idx" ON "ProductFitment"("yearFrom");

-- CreateIndex
CREATE INDEX "ProductFitment_yearTo_idx" ON "ProductFitment"("yearTo");

-- CreateIndex
CREATE UNIQUE INDEX "ProductFitment_productId_brandId_vehicleModelId_productLineId_yearFrom_yearTo_key" ON "ProductFitment"("productId", "brandId", "vehicleModelId", "productLineId", "yearFrom", "yearTo");
