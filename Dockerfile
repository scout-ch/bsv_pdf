FROM node:20 as build

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install 

COPY . ./
RUN ["pnpm", "run", "build"]

FROM nginx:stable-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx/host.conf /etc/nginx/conf.d/default.conf
