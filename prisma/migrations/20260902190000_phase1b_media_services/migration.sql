-- Phase 1B media metadata additions. Existing ProjectMedia rows are preserved.
CREATE TYPE "ProjectMediaType" AS ENUM ('IMAGE', 'VIDEO', 'DOCUMENT');
CREATE TYPE "ProjectMediaCategory" AS ENUM ('CUSTOMER_REFERENCE', 'SITE_SURVEY', 'MEASUREMENT', 'BEFORE_WORK', 'FABRICATION', 'INSTALLATION', 'COMPLETION', 'OTHER');
CREATE TYPE "ProjectMediaStatus" AS ENUM ('ACTIVE', 'QUARANTINED', 'DELETED');

ALTER TABLE "ProjectMedia"
  ADD COLUMN "mediaType" "ProjectMediaType" NOT NULL DEFAULT 'IMAGE',
  ADD COLUMN "category" "ProjectMediaCategory" NOT NULL DEFAULT 'OTHER',
  ADD COLUMN "originalName" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "caption" TEXT,
  ADD COLUMN "width" INTEGER,
  ADD COLUMN "height" INTEGER,
  ADD COLUMN "durationSeconds" INTEGER,
  ADD COLUMN "status" "ProjectMediaStatus" NOT NULL DEFAULT 'ACTIVE',
  ADD COLUMN "uploadedByUserId" TEXT;

UPDATE "ProjectMedia" SET "originalName" = "fileName" WHERE "originalName" = '';

CREATE UNIQUE INDEX "ProjectMedia_storageKey_key" ON "ProjectMedia"("storageKey");
CREATE INDEX "ProjectMedia_projectId_category_createdAt_idx" ON "ProjectMedia"("projectId", "category", "createdAt");
CREATE INDEX "ProjectMedia_uploadedByUserId_createdAt_idx" ON "ProjectMedia"("uploadedByUserId", "createdAt");

ALTER TABLE "ProjectMedia" ADD CONSTRAINT "ProjectMedia_uploadedByUserId_fkey" FOREIGN KEY ("uploadedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;