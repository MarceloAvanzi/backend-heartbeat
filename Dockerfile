FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock* ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]
