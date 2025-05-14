FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
RUN npm install pg --save

COPY . .

RUN npm run build

RUN npm prune --production


FROM node:20-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules

ENV NODE_ENV production

EXPOSE 3000

CMD ["node", "dist/main"]