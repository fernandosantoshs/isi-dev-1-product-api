/*
  Warnings:

  - A unique constraint covering the columns `[normalized_name]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `normalized_name` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "normalized_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_normalized_name_key" ON "products"("normalized_name");
