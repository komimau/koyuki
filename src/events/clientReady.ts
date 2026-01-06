import { Events } from 'discord.js'
import { Bot } from '../classes'

export default async () => {
  Bot.client.once(Events.ClientReady, () => console.log('clientReady'))
}
