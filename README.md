# Heartbeat Service

A simple Express service that pings `https://metriqa-backend.onrender.com/auth/login` every 25 seconds to keep it active.

## Features

- Express server with status endpoint
- Scheduled pings using node-cron
- Docker support for easy deployment

## Running Locally

1. Install dependencies:
```
yarn install
```

2. Start the service:
```
yarn start
```

## Using Docker

1. Build and start with Docker Compose:
```
docker-compose up -d
```

2. Check logs:
```
docker-compose logs -f
```

3. Stop the service:
```
docker-compose down
```

## API

- `GET /`: Returns the current status of the heartbeat service

## Environment Variables

- `PORT`: The port to run the Express server (default: 3000)
