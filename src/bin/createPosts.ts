import Prisma from "@prisma/client";

const prisma = new Prisma.PrismaClient();

async function main() {
  // @see https://www.prisma.io/docs/concepts/components/prisma-client/crud#create-multiple-records

  const data: Prisma.Prisma.PostCreateInput = {
    title: "Sample Post Data Title",
    author: {
      connect: {
        email: "yewande@prisma.io",
      },
    },
  };

  const posts = await prisma.post.create({
    data,
  });
  console.dir(posts, { depth: null });
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
