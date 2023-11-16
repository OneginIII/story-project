FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
ENV VITE_SERVER_URL="http://localhost:3000"

RUN npm run build

FROM node:18-alpine AS final
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY ./package.json .
COPY ./vite.config.ts .
RUN npm install typescript

EXPOSE 4000
CMD ["npm", "run", "preview"]
