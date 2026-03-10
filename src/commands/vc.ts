import { ChatInputCommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js'
import { joinVoiceChannel } from '@discordjs/voice'

export default {
  builder: new SlashCommandBuilder().setName('vc').setDescription('joins your voice channel'),
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
      interaction.reply("You must be in a voice channel!")
      return
    }

    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      selfMute: true,
      selfDeaf: true,
    })

    interaction.editReply(`Joined <#${voiceChannel.id}>`)
  },
}
