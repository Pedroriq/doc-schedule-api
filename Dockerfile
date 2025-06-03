FROM node:22.16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . . 

EXPOSE 3000

RUN npm run typeorm migration:generate src/migration/initSchema -- -- -d src/data-source.ts

CMD ["npm", "start"]
