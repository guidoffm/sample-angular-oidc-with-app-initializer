FROM node:15 as builder
RUN npm install -g @angular/cli
WORKDIR /app
ADD app/package-lock.json .
ADD app/package.json .
RUN npm install
ADD app .
RUN ng build --prod

FROM nginx:1.19.7-alpine
COPY --from=builder app/dist/s3-app /usr/share/nginx/html/
#ADD mime.types /etc/nginx/mime.types
