FROM node:18.15.0-slim as build

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/build /usr/share/nginx/html
