FROM node:14.6-slim
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . /app

RUN npm run build
CMD ["npm","run","start:prod"]
