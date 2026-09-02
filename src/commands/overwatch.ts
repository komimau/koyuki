import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  builder: new SlashCommandBuilder()
    .setName('overwatch')
    .setDescription('Learn more about Overwatch™'),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('https://en.wikipedia.org/wiki/Overwatch_and_pornography')
  },
}
