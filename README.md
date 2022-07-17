# @himenon/prisma-practice

```bash
docker run -e PORT=5000 -p 5000:5000 --rm ghcr.io/himenon/prisma-practice
```

## Setup

```bash
pnpm add prisma
pnpm dlx prisma init
```

## Development

Watch

```bash
$ pnpm run watch
```

Build Step

```bash
$ pnpm run build
$ docker build --no-cache -t ghcr.io/himenon/prisma-practice .
```

## Release

1. Merge `main` branch
2. [GitHub Action] Auto update version by semantic release
3. Create Release
4. [GitHub Action] Push docker

## LICENCE

[@Himenon/prisma-practice](https://github.com/Himenon/prisma-practice)・MIT
