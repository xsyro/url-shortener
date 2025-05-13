FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache openssl nodejs npm

COPY package.json /app/

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:dev"]