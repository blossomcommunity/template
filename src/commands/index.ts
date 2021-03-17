import {Command} from "../types";
import {ping} from "./ping";

export const commands: Command[] = [ping];

const commandsWithAliases = commands.reduce((all, command) => {
  // Dedupe aliases
  const aliases = [...new Set(command.aliases)];

  return aliases.reduce((previous, commandName) => {
    return {...previous, [commandName]: command};
  }, all);
}, {} as Record<string, Command>);

export const aliases = new Map<string, Command>(Object.entries(commandsWithAliases));
