FROM node:16.13.0 as builder

WORKDIR /opt/app
COPY . /opt/app/

RUN yarn install --pure-lockfile && yarn build-storybook

# Serve

FROM nginx:1.16.1-alpine

COPY --from=builder /opt/app/build/storybook /usr/share/nginx/html
COPY --from=builder /opt/app/.docker/storybook/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
