FROM node:25-alpine AS builder

RUN apk add --no-cache git \
    && npm i -g corepack \
    && corepack enable

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY tsconfig.json tsconfig.node.json index.html vite.config.mts ./
COPY src src
COPY public public
COPY .env .

ARG VITE_GIT_COMMIT
ARG VITE_BUILD_ID
RUN pnpm install --frozen-lockfile --trust-lockfile
RUN pnpm run build

FROM rma-tools-docker-local.repo.vito.be/httpd:2.4
COPY --from=builder /usr/src/app/build /usr/local/apache2/htdocs
CMD ["httpd-foreground"]
