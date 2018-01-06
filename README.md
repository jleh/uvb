# UVB pub crawl app

Point tracking app for annual UVB pub crawl @ 5.1. Vaasankatu, Helsinki.

Built with node.js & React. Runs in Heroku.
Built on top of [React + Node Starter for Heroku](https://github.com/alanbsmith/react-node-example).

## Features
* Login with Facebook
* Point tracking
* Live scoreboard

## Incomplete todo list
* Tests
* Better UI design
* Venues to Postgres
* Admin view for schedule changes
* View for last logged points
* Use router for UI

## Setup

### Envs
For local dev create .env file and add these variables for FB login
```
CLIENT_ID
CLIENT_SECRET
```

### Running development evn
Create local database
```
npm run db:migrate
```
Start both server and front with
```
npm run dev:server
npm run dev
```

TODO: Fix: After login FB redirects to local server, not to webpack dev server port.
