import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  builder: new SlashCommandBuilder().setName('ping').setDescription('replies with pong'),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('pong')
  },
}
