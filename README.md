# @himenon/prisma-practice

```bash
docker run -e PORT=5000 -p 5000:5000 --rm ghcr.io/himenon/prisma-practice
```

## Install Prisma

```bash
pnpm add prisma

# Create schema.prisma in `prisma` directory
pnpm dlx prisma init

# Create Prisma Clent Code
pnpm dlx prisma generate
# After, Please restart TSServer (vscode).
```

## Migration

See: <https://www.prisma.io/docs/concepts/components/prisma-migrate>

```bash
# Create a migration from changes in Prisma schema, apply it to the database trigger generators (e.g. Prisma Client)
pnpm dlx prisma migrate dev

# !!!! DANGER !!!!
# Run Migration
pnpm dlx prisma migrate deploy
```

## Development

Run PostgreSQL

```bash
docker compose up -d
```

Watch

```bash
$ pnpm run watch
```

Build Step

```bash
$ pnpm run build
$ docker build --no-cache -t ghcr.io/himenon/prisma-practice .
```

Check Docker Run

```bash
docker run \
  -p 3000:3000 \
  -e PORT=3000 \
  -e "DATABASE_URL=postgresql://postgres:password@db:5432/postgres?schema=public" \
  --rm ghcr.io/himenon/prisma-practice

# http://localhost:3000/get/all
```

## Release

1. Merge `main` branch
2. [GitHub Action] Auto update version by semantic release
3. Create Release
4. [GitHub Action] Push docker

## LICENCE

[@Himenon/prisma-practice](https://github.com/Himenon/prisma-practice)・MIT
