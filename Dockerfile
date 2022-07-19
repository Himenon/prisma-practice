FROM node:16 AS INSTALLER

RUN npm i -g pnpm

WORKDIR /app

COPY . /app/

RUN pnpm i --frozen-lockfile
RUN pnpm build

FROM gcr.io/distroless/nodejs-debian11:16

WORKDIR /app

COPY --from=INSTALLER /app/prisma /app/
COPY --from=INSTALLER /app/dist /app/
COPY --from=INSTALLER /app/node_modules/@generated-prisma-client /app/node_modules/@generated-prisma-client

# CMD ["node", "server.cjs"]
CMD ["server.cjs"]
