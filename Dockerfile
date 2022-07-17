FROM node:18-alpine3.14

RUN apk upgrade --update-cache --available && \
    apk add openssl && \
    rm -rf /var/cache/apk/*

COPY prisma/schema.prisma /server/dist/schema.prisma
COPY dist/server.cjs /server/dist/server.cjs

WORKDIR /server

CMD ["node", "dist/server.cjs"]
