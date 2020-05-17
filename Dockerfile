FROM node:12-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN yarn global add nodemon
RUN yarn
EXPOSE 5000
CMD [ "nodemon", "--exec", "babel-node", "-r", "esm", "server.js" ]
