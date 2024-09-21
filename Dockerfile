# Frontend Dockerfile for Next.js
FROM node:16-alpine AS build

WORKDIR /app

COPY package.json ./

RUN yarn install --frozen-lockfile || true

COPY . .

RUN yarn build

FROM node:16-alpine AS production

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
