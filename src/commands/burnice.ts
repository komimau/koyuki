import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  builder: new SlashCommandBuilder()
    .setName('burnice')
    .setDescription('Burn it, Burnice, burn it, Burnice, gonna watch it burn!'),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('https://youtu.be/t51HUJYMN8k')
  },
}
