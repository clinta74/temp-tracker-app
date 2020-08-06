# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10-alpine as build
RUN apk add g++ make python

ADD . /build

ARG API_URL
ENV API_URL=${API_URL}

ARG GRAPH_URL
ENV GRAPH_URL=${GRAPH_URL}

WORKDIR /build

RUN npm ci && \
    npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15-alpine
COPY --from=build /build/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build/dist /usr/share/nginx/html
