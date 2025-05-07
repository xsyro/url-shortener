FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g ts-node-dev

EXPOSE 8080

CMD ["ts-node-dev", "--respawn", "--transpile-only", "src/main.ts"]