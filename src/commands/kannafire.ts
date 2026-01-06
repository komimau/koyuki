import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from 'discord.js'

export default {
  builder: new SlashCommandBuilder()
    .setName('kannafire')
    .setDescription('Kanna sets things on fire!'),
  run: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply({
      content:
        '🔥<:kmm_kanna0:926133639090151515><:kmm_kanna1:926133703082672168><:kmm_kanna2:926133753586282506>🔥',
      flags: MessageFlags.Ephemeral,
    })
  },
}
