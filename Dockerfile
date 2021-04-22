FROM node:latest

WORKDIR /usr/src

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install
COPY ./src ./src
RUN npm run build

EXPOSE 80
EXPOSE 443

CMD ["node", "./dist/index.js"]