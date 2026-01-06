import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  builder: new SlashCommandBuilder()
    .setName('shikanoko')
    .setDescription('SHIKANOKO NOKONOKO KOSHITANTAN'),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('https://youtu.be/1B6dfnRPMvE')
  },
}
