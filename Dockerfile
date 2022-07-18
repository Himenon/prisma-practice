FROM node:16 AS INSTALLER

RUN npm i -g pnpm

WORKDIR /app

COPY prisma /app/prisma/
COPY src /app/src/
COPY package.json /app/
COPY pnpm-lock.yaml /app/
COPY webpack.config.mjs /app/
COPY tsconfig.json /app/
COPY .npmrc /app/

RUN pnpm i --frozen-lockfile
RUN pnpm build
RUN pnpm i --production

FROM node:16

WORKDIR /app

COPY --from=INSTALLER /app/node_modules /app/
COPY --from=INSTALLER /app/prisma /app/
COPY --from=INSTALLER /app/dist /app/dist/

CMD ["node", "dist/server.cjs"]
