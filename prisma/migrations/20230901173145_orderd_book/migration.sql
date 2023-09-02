/*
  Warnings:

  - The primary key for the `OrderedBook` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `OrderedBook` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderedBook" DROP CONSTRAINT "OrderedBook_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "OrderedBook_pkey" PRIMARY KEY ("bookId", "orderId");

-- AddForeignKey
ALTER TABLE "OrderedBook" ADD CONSTRAINT "OrderedBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
