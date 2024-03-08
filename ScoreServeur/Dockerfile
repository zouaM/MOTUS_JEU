FROM node:14-alpine

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 5000

CMD ["node", "score.js"]
