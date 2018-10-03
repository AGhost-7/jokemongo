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

### Kubernetes
This simple app was mainly built so that I can experiment with kubernetes
clustering with a stateful app. As a result, its fairly simple to get going.
This will be split into two parts: how to get the app running in kubernetes
with the least amount of effort and how to get it running with replication.

If you don't already have kubernetes locally, make sure to check out
[minikube](https://github.com/kubernetes/minikube).

#### Doing it the wrong way

Spin up the cluster:
```sh
minikube start
kubectl apply -f k8s/technically-incorrect-pv.yml
kubectl apply -f k8s/technically-incorrect-deployment.yml
```

And you can now interact with the app using:
```sh
curl $(minikube service jokemongo --url) \
	-d 'What is the motto of people who harvest organs? We de-liver.'
```

And also:
```sh
curl $(minikube service jokemongo --url)
```

#### Doing it the right way
WIP
