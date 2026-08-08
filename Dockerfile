# Full (non-slim) base: better-sqlite3 needs a node-gyp toolchain when no
# prebuilt binary matches the target ABI.
FROM node:24 AS build

RUN npm install -g corepack@latest --force && corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:24-slim

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/.output /app/.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
