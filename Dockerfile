FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

ARG UID=1001
ARG GID=1001
RUN addgroup -S app -g $GID && \ 
    adduser -S -u $UID -G app -D app && \
    chown -R app:app /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent

# add app
#COPY . ./
