FROM node:24.3-slim AS build

RUN corepack enable

WORKDIR /app

COPY package.json .

RUN pnpm install

COPY . .

RUN pnpm build

FROM node:24.3-slim

WORKDIR /app

COPY --from=build /app/.output /app/.output

CMD ["node", ".output/server/index.mjs"]