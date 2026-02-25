# syntax=docker/dockerfile:1.5
# proc-log / nopt (node-gyp 依賴) 要求 ^20.17.0 || >=22.9.0，不可用 18
# 寫死版本避免 --cache-from 重用到舊的 Node 18 層
FROM node:20.18.0-alpine AS deps
WORKDIR /app

# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 
RUN apk add --no-cache python3 make g++ \
    && yarn global add node-gyp

# Install dependencies based on the preferred package manager
COPY ["package.json", "yarn.lock", "./"]
RUN --mount=type=cache,target=/root/.cache/yarn \
    yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:20.18.0 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN --mount=type=cache,target=/app/.next/cache \
    yarn build

# Production image, copy all the files and run next
FROM node:20.18.0-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD ["node", "server.js"]
