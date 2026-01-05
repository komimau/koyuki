import { Bot } from '../classes'

export default async () => {
  Bot.client.once('clientReady', () => console.log('clientReady'))
}
