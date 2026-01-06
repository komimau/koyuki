import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  builder: new SlashCommandBuilder()
    .setName('todo')
    .setDescription("How many things are on Lux's to-do list?"),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply(
      'https://tenor.com/view/spongebob-squarepants-to-do-list-long-list-gif-5580267'
    )
  },
}
