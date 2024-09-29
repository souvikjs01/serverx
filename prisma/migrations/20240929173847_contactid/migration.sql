/*
  Warnings:

  - You are about to drop the column `userId` on the `GroupMember` table. All the data in the column will be lost.
  - Added the required column `contactId` to the `GroupMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GroupMember" DROP CONSTRAINT "GroupMember_userId_fkey";

-- AlterTable
ALTER TABLE "GroupMember" DROP COLUMN "userId",
ADD COLUMN     "contactId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
