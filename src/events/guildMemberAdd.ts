import { Events } from 'discord.js'
import { Bot } from '../classes'

const welcomeChannelId = '801463091824951356'

export default async () => {
  Bot.client.on(Events.GuildMemberAdd, async (member) => {
    if (!member.user.bot) return

    const welcomeChannel = await member.guild.channels.fetch(welcomeChannelId)
    if (welcomeChannel === null) {
      console.error('welcome channel not found')
      return
    }

    let waveEmoji = Bot.client.emojis.cache
      .find((emoji) => emoji.id === '900806481216147487')
      ?.toString()
    if (waveEmoji === undefined) waveEmoji = '<:kmm_wave:900806481216147487>'

    if (welcomeChannel.isTextBased()) {
      const message = `A new bot has joined the server: <@${member.id}>! ${waveEmoji}`

      try {
        await welcomeChannel.send(message)
      } catch (e) {
        console.error(e)
      }
    }
  })
}
