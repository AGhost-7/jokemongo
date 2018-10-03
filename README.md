# Jokemongo
Simple text-based joke app.

## Usage
Submit jokes:
```sh
curl -XPOST jokes.jonathan-boudreau.com \
	-d 'What do you call a factory that sells passable products? A satisfactory.'
```

Fetch jokes:
```sh
curl jokes.jonathan-boudreau.com # => "10: Why did the invisible man turn down the job offer? He couldn't see himself doing it."
```

Upvote the jokes:
```sh
curl -XPOST jokes.jonathan-boudreau/10/up
curl -XPOST jokes.jonathan-boudreau/10/yeaman
```

Downvote the jokes:
```sh
curl -XPOST jokes.jonathan-boudreau/10/down
curl -XPOST jokes.jonathan-boudreau/10/naman
```

## Running the server

### Docker compose
You can run the server in docker compose:

```yaml
version: '2.1'
services:
  app:
    image: aghost7/jokemongo
    environment:
      jokemongo.db.url: 'mongodb://db/jokemongo'
    ports:
      - 8066:8066
  db:
    image: mongo
```
