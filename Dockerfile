# syntax=docker/dockerfile:1.5
# proc-log (node-gyp 依賴) 要求 ^20.17.0 || >=22.9.0
ARG NODE_VERSION=20.18.0

# Install dependencies only when needed
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app

# https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine 
RUN apk add --no-cache python3 make g++ \
    && yarn global add node-gyp

# Install dependencies based on the preferred package manager
COPY ["package.json", "yarn.lock", "./"]
RUN --mount=type=cache,target=/root/.cache/yarn \
    yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN --mount=type=cache,target=/app/.next/cache \
    yarn build

# Production image, copy all the files and run next
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD ["node", "server.js"]
