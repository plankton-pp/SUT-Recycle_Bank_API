FROM node:lts-gallium

WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY . .

CMD ["yarn","run","prod"]
