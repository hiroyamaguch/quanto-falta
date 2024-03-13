# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:slim

WORKDIR /app

COPY . .

# install dependencies
RUN bun install --frozen-lockfile --production

# build project
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN bun run build

# run the app
EXPOSE 3000
ENTRYPOINT [ "bun", "dev" ]
