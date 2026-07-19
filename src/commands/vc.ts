import { ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js'
import { joinVoiceChannel } from '@discordjs/voice'
import { Bot, Environment } from '../classes'

export default {
  builder: new SlashCommandBuilder()
    .setName('vc')
    .setDescription('joins the hideout voice channel'),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply()

    const member = interaction.member
    if (!member) {
      interaction.editReply('`member` not found')
      return
    }
    if (!(member instanceof GuildMember)) {
      interaction.editReply('`member` not GuildMember')
      return
    }

    const voiceChannel = member.voice.channel
    if (!voiceChannel) {
      interaction.reply('You must be in a voice channel!')
      return
    }

    const guild = await Bot.client.guilds.fetch(Environment.DISCORD_GUILD_ID)

    joinVoiceChannel({
      channelId: '1510069567785926827',
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
      selfMute: true,
      selfDeaf: true,
    })

    interaction.editReply(`Joined <#1510069567785926827>`)
  },
}
