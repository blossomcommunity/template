import "dotenv/config";

import {Client, EmbedField} from "discord.js";
import {aliases, commands} from "./commands";
import {StandardEmbed} from "./structs/standard-embed";
import {prisma} from "./services/prisma";
import {redis} from "./services/redis";
import {isDev} from "./constants";
import signale from "signale";

const client = new Client();
const prefix = process.env.PREFIX || "--";

client.on("ready", () => {
  signale.info("Environment:", isDev ? "dev" : "prod");
  signale.success("Ready as", client.user?.tag);
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const [rawCommandName, ...args] = message.content.replace(prefix, "").split(" ");
  const commandName = rawCommandName.toLowerCase();

  if (commandName === "help" && args[0]) {
    const command = aliases.get(args[0]);

    if (!command) {
      return message.reply("⚠ Unknown Command");
    }

    const embed = new StandardEmbed(message.author)
      .addField("Description", command.description)
      .addField("Aliases", command.aliases.map(a => `\`${a}\``).join(", "));

    if (command.syntax) {
      embed.addField("Syntax", `\`${prefix}${args[0]} ${command.syntax}\``);
    }

    return message.reply(embed);
  }

  if (commandName === "help") {
    const fields: EmbedField[] = commands.map(command => {
      const name = command.aliases[0];

      return {
        name: prefix + name,
        value: command.description,
        inline: false,
      };
    });

    const embed = new StandardEmbed(message.author).addFields(fields);

    return message.reply(embed);
  }

  const command = aliases.get(commandName);

  if (!command) {
    return message.reply("⚠ Unknown Command");
  }

  const inhibitors = Array.isArray(command.inhibitors) ? command.inhibitors : [command.inhibitors];

  try {
    for (const inhibitor of inhibitors) {
      await inhibitor(message, args);
    }

    await command.run(message, args);
  } catch (e) {
    await message.reply(`⚠ ${e.message}`);
  }
});

prisma.$connect().then(async () => {
  signale.info("Connected to Database");
  await redis.connect();
  signale.info("Connected to Redis");
  await client.login(process.env.DISCORD_TOKEN);
  signale.info("Connected to Discord");
});
