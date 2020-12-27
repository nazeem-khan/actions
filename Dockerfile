FROM node:10.16.0-alpine

WORKDIR /app

COPY package.json /app

RUN cd /app && npm i --only=production

COPY . .

EXPOSE 3000
CMD ["sh", "-c", "node app.js"]