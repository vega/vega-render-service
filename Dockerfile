FROM node:14-alpine

WORKDIR /usr/src/app
COPY package.json ./

#  add libraries; sudo so non-root user added downstream can get sudo
RUN apk add --no-cache \
    sudo \
    curl \
    build-base \
    g++ \
    libpng \
    libpng-dev \
    jpeg-dev \
    pango-dev \
    cairo-dev \
    giflib-dev \
    python \
    ;

RUN npm install

COPY . .

EXPOSE 8090
CMD [ "yarn", "start" ]
