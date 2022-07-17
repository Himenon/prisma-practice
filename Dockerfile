FROM node:16

RUN npm i -g pnpm

WORKDIR /app

COPY . /app/

RUN pnpm i --frozen-lockfile
RUN pnpm dlx prisma generate
RUN pnpm build

RUN ls -la
RUN ls ./dist

CMD ["node", "dist/server.cjs"]
