import { Events } from 'discord.js'
import { Bot } from '../classes'

export default async () => {
  Bot.client.on(Events.MessageCreate, async (message) => {
    const emoji = '<:kmm_nihahahaha:1224150517710589982>'

    if (message.author.bot) return

    const content = `${message.content}`
    const lowercase = content.toLocaleLowerCase().trim()

    if (lowercase === "i'm back" || lowercase === 'im back') {
      await message.reply('hi back')
    }

    if (lowercase === 'die') {
      await message.reply('no u')
    }

    if (lowercase === 'fuck you') {
      await message.reply('ur mom')
    }

    if (lowercase.startsWith('nihahahaha')) {
      await message.reply(emoji)
    }

    if (lowercase.includes(emoji)) {
      await message.react(emoji)
    }

    if (lowercase.includes('correction')) {
      await message.react('💢')
    }

    if (lowercase.includes('926096916603875388') && message.author.id === '729675536380592199') {
      await message.react('💝')
    }
  })
}
