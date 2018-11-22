# build environment
FROM node:8.12 as builder

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ENV PORT 8080
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN npm install --silent

COPY . /usr/src/app

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "serve"]
