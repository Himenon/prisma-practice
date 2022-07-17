import Prisma from "@prisma/client";
import express from "express";

const prisma = new Prisma.PrismaClient();

const PORT = process.env.PORT || 3000;

process.on("unhandledRejection", error => {
  console.error(error);
});

const createApp = () => {
  const app = express();

  app.get("/get/all", async (req: express.Request, res: express.Response) => {
    const users = await prisma.user.findMany({
      where: {
        email: {
          endsWith: "prisma.io"
        },
      },
    })
    const posts = await prisma.post.findMany();
    res.json({ users, posts });
    res.end();
  });

  /**
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/crud#select-a-subset-of-related-record-fields
   */
  app.get("/get/select/subset", async (req: express.Request, res: express.Response) => {
    const record = await prisma.user.findUnique({
      where: {
        email: "yewande@prisma.io",
      },
      select: {
        email: true,
        posts: {
          select: {
            title: true,
          },
        },
      },
    })
    res.json({ record });
    res.end();
  });

  /**
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/crud#include-related-records
   */
  app.get("/get/related/records", async (req: express.Request, res: express.Response) => {
    const record = await prisma.user.findMany({
      where: {
        id: {
          gt: 2,
        },
      },
      include: {
        posts: true,
      },
    })
    res.json({ record });
    res.end();
  });

  return app;
};

const init = async () => {
  const app = createApp();

  let serverClosing = false;

  const startClose = (reason: string) => {
    if (serverClosing) {
      return;
    }
    serverClosing = true;
    console.log(`Start Close Serve by ${reason}r`);
    httpServer.close(() => {
      console.log(`Terminated by ${reason}`);
    });
  };

  const httpServer = app.listen(PORT, () => {
    console.log(`Serve[${process.env.APP_VERSION}] start: http://0.0.0.0:${PORT}`);
  });

  process.on("SIGTERM", () => {
    startClose("SIGTERM");
  });

  process.on("SIGINT", () => {
    startClose("SIGINT");
  });

  process.on("SIGHUP", () => {
    startClose("SIGHUP");
  });
};

init().catch(error => {
  console.error(error);
  process.exit(1);
});
