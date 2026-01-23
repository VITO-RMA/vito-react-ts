FROM node:25-alpine3.22 AS builder

RUN apk add --no-cache git \
  && rm -f /usr/local/bin/yarn /usr/local/bin/yarnpkg \
  && npm i -g corepack \
  && corepack enable

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY tsconfig.json tsconfig.node.json index.html vite.config.mts ./
COPY src src
COPY public public
COPY .env .

ARG VITE_GIT_COMMIT
ARG VITE_BUILD_ID
RUN pnpm run build

FROM rma-tools-docker-local.repo.vito.be/httpd:2.4
COPY --from=builder /usr/src/app/build /usr/local/apache2/htdocs
CMD ["httpd-foreground"]
