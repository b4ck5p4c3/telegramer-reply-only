# Build
FROM oven/bun:canary AS builder
WORKDIR /usr/src/app
ENV NODE_ENV=production

## Install deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

## Test & compile
COPY . .
RUN bun typecheck && bun run build

# Release
FROM gcr.io/distroless/base-debian13 AS release
COPY --from=builder /usr/src/app/dist/telegramer-reply-only /
HEALTHCHECK \
  --interval=30s \
  --timeout=3s \
  --start-period=5s \
  CMD [ "/telegramer-reply-only", "healthcheck" ]
ENTRYPOINT [ "/telegramer-reply-only" ]
CMD [ "serve" ]
