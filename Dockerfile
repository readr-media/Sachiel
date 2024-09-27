ARG NODE_VERSION=18.18.0

# Install dependencies only when needed
FROM node:${NODE_VERSION} AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:${NODE_VERSION} AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

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
