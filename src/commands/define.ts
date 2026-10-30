import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

interface Entry {
  word: string | null
  definitions: string[]
}

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
      await interaction.editReply('Error fetching definitions.')
      return
    }

    const entry = (await response.json()) as Entry
    if (entry.word === null) {
      await interaction.editReply(`\`${word}\` is not a valid word.`)
      return
    }

    if (entry.definitions.length === 0) {
      await interaction.editReply(`\`${word}\` is missing definitions.`)
      return
    }

    let message = `Definitions for \`${word}\`:`
    for (const definition of entry.definitions) {
      message += `\n- ${definition}`
    }

    await interaction.editReply(message)
  },
}
