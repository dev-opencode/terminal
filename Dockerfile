# Build React client
FROM node:22-slim AS client-builder

WORKDIR /app/client

COPY web-terminal/client/package.json web-terminal/client/package-lock.json ./
RUN npm ci

COPY web-terminal/client/ ./
RUN npm run build


# Runtime dengan Express + WebSocket + PTY
FROM node:22-slim AS runtime

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 make g++ bash \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY web-terminal/server/package.json web-terminal/server/package-lock.json ./
RUN npm ci --omit=dev

COPY web-terminal/server/server.js ./server.js
COPY --from=client-builder /app/client/dist ./dist

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
