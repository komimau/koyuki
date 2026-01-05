import { Bot } from '../classes'
import { type ChatInputCommandInteraction, type CacheType } from 'discord.js'

export default async () => {
  Bot.client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) await handleChatInputCommand(interaction)
  })
}

async function handleChatInputCommand(interaction: ChatInputCommandInteraction<CacheType>) {
  const command = Bot.commands.find((c) => c.builder.name === interaction.commandName)
  if (!command) return

  try {
    await command.run(interaction)
  } catch (error) {
    console.error(error)
  }
}
