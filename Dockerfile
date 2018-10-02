FROM node:carbon

WORKDIR /app

COPY /package.json /app/package.json

RUN npm install

COPY ./lib /app/lib
COPY ./bin /app/bin

CMD ["/app/bin/jokemongo"]

