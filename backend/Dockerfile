# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY ./backend/package.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/app.js"]
