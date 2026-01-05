import Util from './Util'

let env: Record<string, string | undefined> = process.env

export default class Environment {
  public static DISCORD_TOKEN = env.DISCORD_TOKEN ?? Util.error('missing DISCORD_TOKEN')
  public static DISCORD_CLIENT_ID = env.DISCORD_CLIENT_ID ?? Util.error('missing DISCORD_CLIENT_ID')
  public static DISCORD_GUILD_ID = env.DISCORD_GUILD_ID ?? Util.error('missing DISCORD_GUILD_ID')
  public static MONGODB_URI = env.MONGODB_URI ?? Util.error('missing MONGODB_URI')
  public static MONGODB_NAME = env.MONGODB_NAME ?? Util.error('missing MONGODB_NAME')
}
