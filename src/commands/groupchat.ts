import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  builder: new SlashCommandBuilder()
    .setName('groupchat')
    .setDescription("the groupchat when I ask who's available to play"),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('https://youtu.be/9A84gy3QmFg')
  },
}
