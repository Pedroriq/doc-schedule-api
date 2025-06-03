FROM node:22.16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . . 

EXPOSE 3000

RUN npm run migration:run

CMD ["npm", "start"]
