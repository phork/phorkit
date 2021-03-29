FROM node:latest as builder

WORKDIR /opt/app
COPY . /opt/app/

RUN yarn build-docs

# Serve

FROM nginx:1.15-alpine
COPY --from=builder /opt/app/.docz/dist /usr/share/nginx/html
COPY --from=builder /opt/app/.docker/prod/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
