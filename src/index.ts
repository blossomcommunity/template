import {Client} from "discord.js";
import "dotenv/config";

const client = new Client();
const prefix = process.env.PREFIX || "!";

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  const [rawCommandName, ...args] = message.content.replace(prefix, "").split(" ");
  const commandName = rawCommandName.toLowerCase();

  if (commandName === "help" && args[0]) {
    const command = aliases.get(args[0]);
  }
});
