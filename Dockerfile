FROM node:14

WORKDIR /app

COPY /package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

RUN yarn install --frozen-lockfile --prod

COPY ./lib /app/lib
COPY ./bin /app/bin

COPY ./entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

CMD ["/app/bin/jokemongo"]
