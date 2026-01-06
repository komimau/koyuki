import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  builder: new SlashCommandBuilder()
    .setName('nihahahaha')
    .setDescription('NIHAHAHAHAHAHAHAHAHAHAHAHAHHAHAAHAHAHHA'),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('https://youtu.be/aUP-DW7ZIHI')
  },
}
