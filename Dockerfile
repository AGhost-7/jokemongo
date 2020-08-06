FROM node:carbon

WORKDIR /app

COPY /package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

RUN yarn install --frozen-lockfile --prod

COPY ./lib /app/lib
COPY ./bin /app/bin

CMD ["/app/bin/jokemongo"]

