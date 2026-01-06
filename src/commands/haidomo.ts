import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  builder: new SlashCommandBuilder()
    .setName('haidomo')
    .setDescription('HAI DOMO VIRTUAL YOUTUBER KIZUNA AI DESU'),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('https://youtu.be/31FijONDVj8')
  },
}
