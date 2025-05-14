# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Build the application
RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./

RUN npm ci --omit=dev && \
    npm install -g serve

EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"]