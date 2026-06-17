import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  builder: new SlashCommandBuilder().setName('nicegame').setDescription('SENNA TOPPU WATTA FAKKU'),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('https://youtu.be/MJLAsVHMOjk')
  },
}
