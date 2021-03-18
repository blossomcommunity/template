import {wrapRedis} from "../../services/redis";
import {Command} from "../../types/command";

export const redisExample: Command = {
  aliases: ["redis-example"],
  description: "Demonstrates the wrapRedis function",
  inhibitors: [],
  async run(message) {
    const data = await wrapRedis(`example:${message.author.id}`, verySlowFunction, 120);
    await message.reply(data);
  },
};

/**
 * A very slow function that could imitate a database lookup
 * @returns A random number
 */
async function verySlowFunction() {
  await new Promise(r => setTimeout(r, 5000));
  return Math.ceil(Math.random() * 10000);
}
