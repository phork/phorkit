FROM node:latest as builder

WORKDIR /opt/app
COPY . /opt/app/

RUN yarn build-docz

# Serve

FROM nginx:1.16.1-alpine

COPY --from=builder /opt/app/build/docz /usr/share/nginx/html
COPY --from=builder /opt/app/.docker/docz/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
