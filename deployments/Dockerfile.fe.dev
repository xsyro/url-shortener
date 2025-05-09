FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

RUN npm install

COPY . .

RUN apk add --no-cache libc6-compat

EXPOSE 3000

CMD ["npm", "run", "dev"]
