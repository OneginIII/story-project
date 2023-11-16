FROM node:18-alpine AS builder
WORKDIR /server

COPY ./package*.json ./
COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
COPY ./public ./public
ENV PORT=3000
ENV STATIC_PAGE_LOCATION="./public/staticPages/"

RUN npm ci
RUN npm run build

FROM node:18-alpine AS final
WORKDIR /server
COPY --from=builder ./server/dist ./dist
COPY ./public ./public
COPY ./package*.json ./
RUN npm ci --production

EXPOSE 3000
CMD ["npm", "start"]
