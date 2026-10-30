import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export default {
  builder: new SlashCommandBuilder()
    .setName('define')
    .setDescription('Get definitions for a word (CSW24 + Wiktionary).')
    .addStringOption((option) =>
      option.setName('word').setDescription('The word to define').setRequired(true)
    ),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.deferReply()

    const word = interaction.options.getString('word')!.trim().toLowerCase()

    const url = `https://scrabble.luxmiyu.com/api/definitions/${word}`
    const response = await fetch(url)

    if (!response.ok) {
      await interaction.editReply('Error fetching definition.')
      return
    }

    const definitions = (await response.json()) as string[]
    if (definitions.length === 0) {
      await interaction.editReply(`No definition found for \`${word}\`.`)
      return
    }

    let message = `Definitions for \`${word}\`:`
    for (const definition of definitions) {
      message += `\n- ${definition}`
    }

    await interaction.editReply(message)
  },
}
