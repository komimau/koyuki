import { Events } from 'discord.js'
import { Bot, Environment } from '../classes'
import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice'

export default async () => {
  const INTERVAL_MS = 1000 * 60 * 3

  Bot.client.once(Events.ClientReady, async () => {
    console.log('clientReady')

    const guild = await Bot.client.guilds.fetch(Environment.DISCORD_GUILD_ID)

    function connect() {
      const connection = getVoiceConnection(Environment.DISCORD_GUILD_ID)

      if (!connection) {
        joinVoiceChannel({
          channelId: '1510069567785926827',
          guildId: guild.id,
          adapterCreator: guild.voiceAdapterCreator,
          selfMute: true,
          selfDeaf: true,
        })

        console.log('Joined <#1510069567785926827>')
      } else {
        connection.rejoin()
      }
    }

    setInterval(() => connect(), INTERVAL_MS)

    connect()
  })
}
