FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
# RUN npm install pg --save

COPY . .

RUN npm run build
RUN ls -la dist/ || exit 1

RUN npm prune --production


FROM node:20-alpine AS production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev && \
    npm install -g typescript ts-node typeorm

COPY --from=build /usr/src/app/dist/ ./dist/
COPY --from=build /usr/src/app/src ./src
COPY --from=build /usr/src/app/migration ./migration
COPY --from=build /usr/src/app/tsconfig*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
    

ENV NODE_ENV production
ENV TYPEORM_CONFIG=src/db/migration.datasource.ts

EXPOSE 3000

CMD ["/bin/sh", "-c", "npm run migration:run && node dist/src/main"]