import { Bot } from '../classes'
import { type ChatInputCommandInteraction, type CacheType, Events } from 'discord.js'

export default async () => {
  Bot.client.on(Events.InteractionCreate, async (interaction) => {
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
