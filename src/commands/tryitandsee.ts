import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  builder: new SlashCommandBuilder()
    .setName('tryitandsee')
    .setDescription('Will this work? Try it and see!'),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('https://tryitands.ee/')
  },
}
