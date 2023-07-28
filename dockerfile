FROM node:12.18.1

WORKDIR /app

COPY ["package.json", "./"]

RUN npm install

COPY . .

EXPOSE 3000

RUN chmod +x startup.sh
RUN npm i -g sequelize-cli
ENTRYPOINT [ "./startup.sh" ]

# CMD [ "node", "server.js" ]