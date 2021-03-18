# `template`

A super basic Discord bot template using redis, discord.js, postgres & prisma. The bot comes with a few commands premade, but you can strip them out by removing them in the `src/commands` folder.

## Prerequsites

- TypeScript knowledge
- Node, NPM & Yarn
- Docker _(optional)_

## Commands

The command system is really robust, you can specify an array of aliases, description, and even a syntax. To add a new command, create it under the `src/commands` folder (view an example under `src/commands.ping.ts`) and then add it to the `commands` array under `src/commands/index.ts`. No extra effort required, just add it to the array!

### Example

```typescript
export const ping: Command = {
  aliases: ["ping", "pi"],
  description: "Checks that the bot is online",
  syntax: "<message>",
  inhibitors: [],
  async run(message, args) {
    await message.reply(args.join(" "));
  },
};
```

### Inhibitors

Inhibitors are a way of ensuring a certain condition is met before a command is executed. They can even be async!

Here's an example:

```typescript
import {Inhibitor} from "../types/command";

export const guilds: Inhibitor = message => {
  if (!message.guild) {
    throw new Error("You must use this command in a server.");
  }
};
```

This inhibitor throws an error if this command was not used in a guild. Nice! We can use it in our ping command above by importing it into our file, and adding it to our inhibitors property.

```ts
import {guilds} from "../inhibitors/guilds";

export const ping: Command = {
  inhibitors: guilds, // Or, use an array for multiple. They will be executed in order.
};
```

## Downloading

1. Hit "Use this template" in the top right
2. Clone your repo
3. Run `yarn install`
4. If you are using docker, run `yarn services:up` (creates our containers for development)
5. **_Copy_** `.env.example` to a new file called `.env` and edit the values
6. Run `yarn dev` to connect to Discord and local services

## Development

### Extra dependencies

This template comes preinstalled with [colinhacks/zod](https://github.com/colinhacks/zod) for validation, and [node-fetch/node-fetch](https://github.com/node-fetch/node-fetch) for making HTTP requests to other services. If you don't want to use them, you can remove all traces of them with the following command.

```
yarn remove node-fetch @types/node-fetch zod
```

There is also [klaussinani/signale](https://github.com/klaussinani/signale) for logging. You can remove this, but we recommend against it since it's setup in some files already. To remove it, run `yarn remove signale @types/signale`

### Database Migrations

We use [prisma](https://prisma.io) migrations for editing your database schema. It's super easy to get started, simply run `yarn migrate` to edit your database in development, and when you are ready to deploy, you can run `yarn migrate:deploy` to edit your production schema. You can [read more about prisma migrate here](https://www.prisma.io/docs/concepts/components/prisma-migrate).

### Scripts

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
