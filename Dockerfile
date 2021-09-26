FROM node:14.6-slim
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . /app
EXPOSE 4000
RUN npm run build
CMD ["npm","run","start:prod"]
