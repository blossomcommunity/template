import {Inhibitor} from "../types/command";

export const guilds: Inhibitor = message => {
  if (!message.guild) {
    throw new Error("You must use this command in a server.");
  }
};
