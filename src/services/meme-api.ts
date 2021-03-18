import fetch from "node-fetch";

export class MemeAPI {
  private static readonly API_BASE = "https://meme-api.herokuapp.com";

  /**
   * Generates a random meme URL
   */
  public static async randomMeme(): Promise<string> {
    const request = await fetch(this.API_BASE + "/gimme");
    const {url} = await request.json();
    return url;
  }
}
