import {Command} from "../../types/command";
import {MemeAPI} from "../../services/meme-api";
import {StandardEmbed} from "../../structs/standard-embed";

export const meme: Command = {
  description: "Generates a random meme",
  aliases: ["meme", "rm", "randommeme"],
  inhibitors: [],
  async run(message) {
    const image = await MemeAPI.randomMeme();

    const embed = new StandardEmbed(message.author).setTitle("Random Meme").setImage(image);

    await message.channel.send(embed);
  },
};
