FROM node:20-alpine as build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine as serve

COPY --from=build /usr/src/app/dist /usr/share/nginx/html/
