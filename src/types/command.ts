import {Message} from "discord.js";

/**
 * The generic interface for a command with this template
 */
export interface Command {
  /**
   * A short description of what this command does. It is shown on the help menu
   */
  description: string;

  /**
   * An array or a single inhibitor. This is a function that will halt execution of a command if an error is thrown.
   */
  inhibitors: Inhibitor[] | Inhibitor;

  /**
   * An optional syntax explaining how this command can be used
   */
  syntax?: string;

  /**
   * Aliases for this command. The first item will be the command that shows up in the help menu
   */
  aliases: string[];

  /**
   * Whether this command should be shown in the help menu or not. This is useful for development/sysadmin commands etc
   */
  hideInHelpMenu?: boolean;

  /**
   * Executor for this command
   * @param message The message object
   * @param args An array of arguments (the message content split by a space)
   */
  run(message: Message, args: string[]): Promise<void>;
}

/**
 * A function that halts command execution if an error is thrown.
 */
export type Inhibitor = (message: Message, args: string[]) => Promise<void> | void;
