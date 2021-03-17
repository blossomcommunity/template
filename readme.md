# `template`

A super basic Discord bot template using redis, discord.js, postgres & prisma.

## Prerequsites

- TypeScript knowledge
- Node, NPM & Yarn
- Docker _(optional)_

## Downloading

1. Hit "Use this template" in the top right
2. Clone your repo
3. Run `yarn install`
4. If you are using docker, run `yarn services:up` (creates our containers for development)
5. **_Copy_** `.env.example` to a new file called `.env` and edit the values
6. Run `yarn dev` to connect to Discord and local services

## Development

## Scripts

You can use `yarn dev` to start the app in development mode. It uses hot reloading and will even set the environment variable `NODE_ENV` to development.

### Docker

If you are using docker, you can use the following commands to manage your containers

| Command               | Description               |
| --------------------- | ------------------------- |
| `yarn services:up`    | Creates containers        |
| `yarn services:down`  | Removes containers & data |
| `yarn services:start` | Starts containers         |
| `yarn services:stop`  | Stops containers          |

You will only need to run `yarn services:up` once if you do not wish to remove data between development sessions. Running `yarn services:down` will remove your containers and any data along with them, hence the existence of `start` and `stop`.

## Production

If you start the app with `yarn start` in production, it will set the environment variable `NODE_ENV` to be production, you can make a check with the following code.

```typescript
const isProduction = process.env.NODE_ENV !== "development";
```

Note, it's better to check _against_ development, since that will be the only time it will intentionally be set to development. It might be forgotten in production and at which point your `isProduction` variable will be false.

## Building

Building is simple, you can just run `yarn build` which calls `tsc` under the hood.

## Acknowledgements

- [Jack LaFond](https://lafond.dev)
- [Alistair Smith](https://alistair.cloud)
