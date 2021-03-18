import {Command} from "../../types/command";
import {manageServer} from "../../inhibitors/permissions/manage-server";
import {StandardEmbed} from "../../structs/standard-embed";

export const kick: Command = {
  description: "Kicks a member from a guild",
  inhibitors: manageServer,
  aliases: ["kick", "k"],
  syntax: "<user> [reason]",
  async run(message, [, ...reason]) {
    const user = message.mentions.users.first();

    if (!user) {
      throw new Error("You must mention a user to kick.");
    }

    const member = await message.guild!.members.fetch(user.id);

    if (!member) {
      throw new Error("That user is not in this guild");
    }

    await member.kick(reason.join(" "));

    const embed = new StandardEmbed(message.author).setTitle(`Successfully kicked <@${user.id}>.`);

    await message.channel.send(embed);
  },
};
