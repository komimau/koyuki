import { Client, GatewayIntentBits } from 'discord.js'
import { Environment } from '../classes'
import type { BotCommand, BotEvent } from '../types'
import * as commands from '../commands'
import * as events from '../events'

const client: Client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    // GatewayIntentBits.GuildInvites,
    // GatewayIntentBits.GuildMembers,
    // GatewayIntentBits.GuildMessages,
    // GatewayIntentBits.GuildWebhooks,
    // GatewayIntentBits.GuildPresences,
    // GatewayIntentBits.GuildExpressions,
    // GatewayIntentBits.GuildVoiceStates,
    // GatewayIntentBits.GuildMessagePolls,
    // GatewayIntentBits.GuildMessageTyping,
    // GatewayIntentBits.GuildMessageReactions,
    // GatewayIntentBits.GuildScheduledEvents,
    // GatewayIntentBits.GuildModeration,
    // GatewayIntentBits.MessageContent,
  ],
})

export default class Bot {
  private static initialized = false

  public static get client(): Client {
    return client
  }

  public static get commands(): BotCommand[] {
    return Object.values(commands)
  }

  public static get events(): BotEvent[] {
    return Object.values(events)
  }

  public static isInitialized(): boolean {
    return Bot.initialized
  }

  public static async initialize() {
    if (Bot.isInitialized()) {
      console.log('Bot already initialized')
      return
    }

    await client.login(Environment.DISCORD_TOKEN)
    Bot.initialized = true

    for (const addEvent of Bot.events) {
      await addEvent()
    }
  }
}
