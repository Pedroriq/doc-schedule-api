FROM node:22.16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . . 

COPY entrypoint.sh /usr/src/app/entrypoint.sh
RUN chmod +x /usr/src/app/entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

