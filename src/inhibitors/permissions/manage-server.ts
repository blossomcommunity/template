import {Inhibitor} from "../../types/command";
import {guilds} from "../guilds";
import {Permissions} from "discord.js";

export const manageServer: Inhibitor = (message, args) => {
  guilds(message, args);

  if (!message.member) {
    throw new Error("You must use this command in a server.");
  }

  const canManageServer = message.member.hasPermission(Permissions.FLAGS.MANAGE_GUILD);

  if (!canManageServer) {
    throw new Error("You do not have permission to use this command");
  }
};
