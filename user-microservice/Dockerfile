FROM node:12.18.4
WORKDIR /app

COPY package*.json ./
RUN npm install --silent

COPY ./ ./
RUN npm run build

CMD npm run start:prod
