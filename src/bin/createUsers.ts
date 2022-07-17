import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // @see https://www.prisma.io/docs/concepts/components/prisma-client/crud#create-multiple-records
  const allUsers = await prisma.user.createMany({
    data: [
      { name: 'Bob', email: 'bob@prisma.io' },
      { name: 'Bobo', email: 'bob@prisma.io' }, // Duplicate unique key!
      { name: 'Yewande', email: 'yewande@prisma.io' },
      { name: 'Angelique', email: 'angelique@prisma.io' },
    ],
    skipDuplicates: true,
  });
  console.dir(allUsers, { depth: null });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
