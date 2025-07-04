FROM node:alpine

WORKDIR /app

COPY package.json yarn.lock nodemon.json ./

RUN yarn install

EXPOSE 5000

CMD ["yarn", "run", "dev"]