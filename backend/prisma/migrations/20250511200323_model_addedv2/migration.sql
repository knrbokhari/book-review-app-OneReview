/*
  Warnings:

  - You are about to drop the `_AuthorsToBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AuthorsToBook" DROP CONSTRAINT "_AuthorsToBook_A_fkey";

-- DropForeignKey
ALTER TABLE "_AuthorsToBook" DROP CONSTRAINT "_AuthorsToBook_B_fkey";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "authorId" INTEGER,
ALTER COLUMN "viewWeight" DROP NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;

-- DropTable
DROP TABLE "_AuthorsToBook";

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Authors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
