import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/crud#update
 */
async function main() {
  const updateUser = await prisma.user.update({
    where: {
      email: "bob@prisma.io",
    },
    data: {
      name: "Viola the Magnificent testtest",
    },
  });
  console.dir(updateUser, { depth: null });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
