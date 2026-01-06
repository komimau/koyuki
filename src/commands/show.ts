import {
  ChatInputCommandInteraction,
  ContainerBuilder,
  MessageFlags,
  SlashCommandBuilder,
  TextDisplayBuilder,
} from 'discord.js'

export default {
  builder: new SlashCommandBuilder()
    .setName('show')
    .setDescription('show something')
    .addStringOption((option) =>
      option.setName('message').setDescription('the message to show').setRequired(true)
    ),
  run: async (interaction: ChatInputCommandInteraction) => {
    const message = interaction.options.getString('message')!
    await interaction.reply({
      components: [
        new ContainerBuilder().addTextDisplayComponents(
          new TextDisplayBuilder().setContent(message)
        ),
      ],
      flags: MessageFlags.IsComponentsV2,
    })
  },
}
