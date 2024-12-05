FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app

COPY client/package.json client/pnpm-lock.yaml ./
RUN pnpm i

COPY ./client .

ARG VITE_DIRECTUS_PUBLIC_URL
ENV VITE_DIRECTUS_PUBLIC_URL=${VITE_DIRECTUS_PUBLIC_URL}
ARG VITE_ACCESS_TOKEN_KEY
ENV VITE_ACCESS_TOKEN_KEY=${VITE_ACCESS_TOKEN_KEY}

RUN pnpm build


FROM nginx:1-alpine

ARG VITE_DIRECTUS_PUBLIC_URL
ENV VITE_DIRECTUS_PUBLIC_URL=${VITE_DIRECTUS_PUBLIC_URL}
ARG VITE_ACCESS_TOKEN_KEY
ENV VITE_ACCESS_TOKEN_KEY=${VITE_ACCESS_TOKEN_KEY}

COPY --from=builder /app/dist /var/www/html
