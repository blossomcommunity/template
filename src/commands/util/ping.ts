import {Command} from "../../types/command";

export const ping: Command = {
  aliases: ["ping", "pi"],
  description: "Checks that the bot is online",
  syntax: "<message>",
  inhibitors: [],
  async run(message, args) {
    await message.reply(args.join(" "));
  },
};
