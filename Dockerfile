FROM node:carbon

WORKDIR /api

COPY package.json package-lock.json /api/

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]