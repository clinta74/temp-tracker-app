# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10-alpine as build

ADD . /build

ARG ENVIRONMENT
ARG API_URL
ARG NPM_TOKEN

WORKDIR /build

RUN echo //registry.npmjs.org/:_authToken=${NPM_TOKEN} >> ~/.npmrc && \
    npm ci && \
    npm run build && \
    rm -rf ~/.npmrc

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15-alpine
COPY --from=build /build/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build/dist /usr/share/nginx/html
