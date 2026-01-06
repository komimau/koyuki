import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  builder: new SlashCommandBuilder()
    .setName('say')
    .setDescription('say something')
    .addStringOption((option) =>
      option.setName('message').setDescription('the message to say').setRequired(true)
    ),
  run: async (interaction: ChatInputCommandInteraction) => {
    const message = interaction.options.getString('message')!
    await interaction.reply(message)
  },
}
