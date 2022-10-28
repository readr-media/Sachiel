ARG NODE_VERSION=16.17.0

FROM node:${NODE_VERSION} AS build

WORKDIR /build

ADD . /build/

RUN yarn install

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install && yarn build

FROM node:${NODE_VERSION}

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /build/public ./public
COPY --from=build /build/.next/standalone ./
COPY --from=build /build/.next/static ./.next/static

CMD ["node", "server.js"]
