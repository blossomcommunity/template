/**
 * Whether or not the app is running in development mode
 */
export const isDev = process.env.NODE_ENV === "development";

/**
 * Prefix for the bot
 */
export const prefix = process.env.PREFIX || "--";
