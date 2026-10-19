# ---- Build stage ----
FROM rust:1.89-slim-bookworm AS builder
WORKDIR /app

RUN apt-get update && apt-get install -y pkg-config libssl-dev && rm -rf /var/lib/apt/lists/*

COPY Cargo.toml Cargo.lock ./
COPY src ./src
COPY templates ./templates

RUN cargo build --release

# ---- Static build stage: precompile JSX and minify (no in-browser Babel) ----
FROM node:20-slim AS static
WORKDIR /app
RUN npm install --no-save @babel/cli @babel/core @babel/preset-env @babel/preset-react terser
COPY client-src ./client-src
COPY static ./static
COPY babel.config.json ./
RUN ./node_modules/.bin/babel client-src/tap-app.jsx --out-file /tmp/tap-app.js \
 && ./node_modules/.bin/terser /tmp/tap-app.js -c passes=2 -m -o static/tap-app.min.js \
 && ./node_modules/.bin/terser client-src/e2ee.js -c passes=2 -m -o static/e2ee.min.js \
 && ./node_modules/.bin/terser client-src/webauthn.js -c passes=2 -m -o static/webauthn.min.js \
 && rm -f static/tap-app.js static/tap-app.jsx static/e2ee.js static/webauthn.js

# ---- Runtime stage ----
FROM debian:bookworm-slim
WORKDIR /app

RUN apt-get update && apt-get install -y ca-certificates libssl3 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/release/kolo /app/kolo
COPY --from=static /app/static ./static

EXPOSE 3000
CMD ["./kolo"]
