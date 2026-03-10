import { Events } from 'discord.js'
import { Bot, Environment } from '../classes'
import { joinVoiceChannel } from '@discordjs/voice'

export default async () => {
  Bot.client.once(Events.ClientReady, async () => {
    console.log('clientReady')

    const guild = await Bot.client.guilds.fetch(Environment.DISCORD_GUILD_ID)

    joinVoiceChannel({
      channelId: "801543584523354182",
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfMute: true,
      selfDeaf: true,
    })

    console.log("Joined <#801543584523354182>")
  })
}
